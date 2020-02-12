from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('saveHwFileReturnText/', views.SaveHWFileAndReturnText.as_view(), name='save_hw_file_and_return_text'),
    path('updateHwFileByPostedText/', views.UpdateHandWrittenFileByPostedText.as_view(), name='update_hw_file_by_posted_text'),
    path('returnTextOfAnyHwFile/', views.ReturnTextOfAnyHwFile.as_view(), name='return_text_of_any_hw_file'),
]
