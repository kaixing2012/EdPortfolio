from rest_framework import serializers
from .models import ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    imageUrl = serializers.ImageField(source="image")

    class Meta:
        model = ProductImage
        fields = ["id", "name", "imageUrl"]
