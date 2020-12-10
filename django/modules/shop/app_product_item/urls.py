from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views_api import ProductItemListAPI
from .views_api import ProductItemDetailAPI

urlpatterns = [
    path("", ProductItemListAPI.as_view()),
    path("<int:product_item_id>/", ProductItemDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
