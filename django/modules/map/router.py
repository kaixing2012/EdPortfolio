from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from .app_wonder.views_api import WonderAPIViewSet


router = routers.DefaultRouter()
router.register("wonder", WonderAPIViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
