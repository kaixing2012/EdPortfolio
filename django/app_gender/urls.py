from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views_api import GenderListAPI
from .views_api import GenderDetailAPI

urlpatterns = [
    path("", GenderListAPI.as_view()),
    path("<int:gender_id>/", GenderDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
