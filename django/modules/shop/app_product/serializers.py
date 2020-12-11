from rest_framework import serializers

from ..app_product_item.serializers import ProductItemSerializer
from ..app_product_image.serializers import ProductImageSerializer
from ..app_size.serializers import SizeSerializer

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    productItem = ProductItemSerializer(source="product_item")
    productImage = ProductImageSerializer(source="product_image")

    class Meta:
        model = Product
        fields = ["id", "productItem", "productImage", "size",
                  "color", "gender", "category", "stock"]
        depth = 1
