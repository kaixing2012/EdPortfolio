from rest_framework import serializers

from ..app_product_item.serializers import ProductItemSerializer
from ..app_product_image.serializers import ProductImageSerializer
from ..app_size.serializers import SizeSerializer

from ..app_product_item.models import ProductItem

from .models import Product


class ProductPerformGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1


class ProductPerformOperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
