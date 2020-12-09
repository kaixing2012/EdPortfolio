from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views_api import CategoryListAPI
from .views_api import CategoryDetailAPI

urlpatterns = [
    path("", CategoryListAPI.as_view()),
    path("<int:category_id>/", CategoryDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
