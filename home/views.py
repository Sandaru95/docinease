from django.shortcuts import render, redirect, HttpResponse
from .models import HwPdf
from django.views import generic
from .pdf_gen import return_text_from_given_img, return_pdf_from_given_text
import os
import json

class IndexView(generic.TemplateView):
    template_name = 'home/index.html'

class SaveHWFileAndReturnText(generic.View):
    def post(self, request):
        print("Saving a HW File")
        uploaded_img = request.FILES["hw_upload_input"]
        
        # Creating a New HW but NOT SAVING | FOR ESSENTIAL PATHS
        new_hw_pdf = HwPdf()
        new_hw_pdf.image_file = request.FILES["hw_upload_input"]
        new_hw_pdf.save()

        # essential paths
        image_name = new_hw_pdf.image_file.url.split("/")[3]
        image_name_without_extension = (new_hw_pdf.image_file.url.split("/")[3]).split(".")[0]
        image_url = "media/image_files/" + image_name

        returned_text = return_text_from_given_img(image_url, image_name_without_extension)

        # Saving text to the HW Model Obj
        new_hw_pdf.content = returned_text

        returning_meta = {}

        returning_meta["returned_text"] = returned_text
        returning_meta["item_pk"] = new_hw_pdf.pk

        # Giving the obj a name
        new_hw_pdf.name = returning_meta["returned_text"][:25]
        new_hw_pdf.save()

        return HttpResponse(json.dumps(returning_meta))

class UpdateHandWrittenFileByPostedText(generic.View):
    def post(self, request):
        print("Updating the PDF of Saved Item with a new PDF")
        print(request.POST["posted_item_edited_text"])
        # Creating a New Hand Written Pdf
        grabbed_hw_file = HwPdf.objects.get(pk=request.POST["posted_item_pk"])
        
        # Generating the pdf
        image_name = grabbed_hw_file.image_file.url.split("/")[3]
        image_name_without_extension = (grabbed_hw_file.image_file.url.split("/")[3]).split(".")[0]
        image_url = "media/image_files/" + image_name

        generated_metas = return_pdf_from_given_text(image_url, image_name_without_extension, request.POST["posted_item_edited_text"])

        generated_pdf_path = generated_metas["returning_path"]
        generated_pdf_name = generated_metas["generated_name"]
        
        grabbed_hw_file.pdf_file = generated_pdf_path
        grabbed_hw_file.content = request.POST["posted_item_edited_text"]
        grabbed_hw_file.save()

        # Appending pk of the item to generated_metas
        generated_metas["item_pk"] = grabbed_hw_file.pk
        generated_metas["generated_name"] = grabbed_hw_file.name

        return HttpResponse(json.dumps(generated_metas))

# Return text of any saved HW :BY PK
class ReturnTextOfAnyHwFile(generic.View):
    def post(self, request):
        posted_pk = request.POST['posted_pk']
        item_got = HwPdf.objects.get(pk=posted_pk)
        return HttpResponse(json.dumps(item_got.content))