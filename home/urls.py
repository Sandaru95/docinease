from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('returnHwFileText/', views.ReturnHwFileText.as_view(), name='return_hw_file_text'),
    path('updateHwFileByPostedText/', views.UpdateHandWrittenFileByPostedText.as_view(), name='update_hw_file_by_posted_text')
]
