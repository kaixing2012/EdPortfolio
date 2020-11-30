from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views_api import WonderListAPI
from .views_api import WonderDetailAPI

urlpatterns = [
    path("", WonderListAPI.as_view()),
    path("<int:wonder_id>/", WonderDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
