from rest_framework import serializers
from .models import ShoppingItem


class ShoppingItemPerformGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingItem
        fields = "__all__"
        depth = 2


class ShoppingItemPerformOperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingItem
        fields = "__all__"
