from django.shortcuts import render, HttpResponse
from django.views import generic
from .models import Suggestion

class IndexView(generic.TemplateView):
    template_name = 'about/index.html'

class saveSuggestion(generic.View):
    def post(self, request):
        
        new_suggestion = Suggestion()
        new_suggestion.content = request.POST['suggest_message_input']
        new_suggestion.save()
        
        return HttpResponse("success")