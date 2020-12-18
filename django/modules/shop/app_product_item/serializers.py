from rest_framework import serializers
from .models import ProductItem


class ProductItemSerializer(serializers.ModelSerializer):
    coverUrl = serializers.ImageField(source="cover")

    class Meta:
        model = ProductItem
        fields = "__all__"
