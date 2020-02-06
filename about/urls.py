from django.urls import path
from . import views

app_name = 'about'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('saveSuggestion/', views.saveSuggestion.as_view(), name='save_suggestion'),
]