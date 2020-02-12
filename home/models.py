from django.db import models

class HwPdf(models.Model):
    name = models.CharField(max_length=100, default="dumb")
    content = models.TextField(max_length=5000000000, default="")
    image_file = models.FileField(upload_to="image_files/", null=True, blank=True)
    pdf_file = models.FileField(upload_to="pdfs/", null=True, blank=True)

    def __str__(self):
        return str(self.name[:50])