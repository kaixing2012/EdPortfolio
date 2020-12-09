from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views_api import ColorListAPI
from .views_api import ColorDetailAPI

urlpatterns = [
    path("", ColorListAPI.as_view()),
    path("<int:color_id>/", ColorDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
