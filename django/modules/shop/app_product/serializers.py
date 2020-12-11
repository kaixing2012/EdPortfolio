from rest_framework import serializers

from ..app_product_item.serializers import ProductItemSerializer

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    productItem = ProductItemSerializer(source="product_item")
    imagePath = serializers.ImageField(source="image")

    class Meta:
        model = Product
        fields = ["id", "productItem", "size", "color",
                  "gender", "category", "imagePath", "stock"]
        depth = 1
