from rest_framework import routers

from app_wonder.views_api import WonderApiView

router = routers.DefaultRouter()
router.register('wonder', WonderApiView)
