from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from .app_size.views_api import SizeAPIViewSet
from .app_color.views_api import ColorAPIViewSet
from .app_gender.views_api import GenderAPIViewSet
from .app_category.views_api import CategoryAPIViewSet
from .app_product.views_api import ProductAPIViewSet
from .app_product_item.views_api import ProductItemAPIViewSet
from .app_product_image.views_api import ProductImageAPIViewSet
from .app_shopping_item.views_api import ShoppingItemAPIViewSet
from .app_shopping_cart.views_api import ShoppingCartAPIViewSet


router = routers.DefaultRouter()
router.register("size", SizeAPIViewSet)
router.register("color", ColorAPIViewSet)
router.register("gender", GenderAPIViewSet)
router.register("category", CategoryAPIViewSet)
router.register("product", ProductAPIViewSet)
router.register("product-item", ProductItemAPIViewSet)
router.register("product-image", ProductImageAPIViewSet)
router.register("shopping-item", ShoppingItemAPIViewSet)
router.register("shopping-cart", ShoppingCartAPIViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
