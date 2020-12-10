from rest_framework import serializers
from .models import ProductItem


class ProductItemSerializer(serializers.ModelSerializer):
    imagePath = serializers.ImageField(source="image")

    class Meta:
        model = ProductItem
        fields = ["name", "price", "imagePath"]
