from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views_api import SizeListAPI
from .views_api import SizeDetailAPI

urlpatterns = [
    path("", SizeListAPI.as_view()),
    path("<int:size_id>/", SizeDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
