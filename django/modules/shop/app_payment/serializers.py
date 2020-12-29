from rest_framework import serializers
from .models import Payment

from ..app_shopping_cart.serializers import ShoppingCartPerformGetSerializer


class PaymentPerformGetSerializer(serializers.ModelSerializer):
    cart = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = "__all__"
        depth = 2

    def get_cart(self, instance):
        request = self.context.get('request')
        serializer = ShoppingCartPerformGetSerializer(
            instance.cart, context={"request": request})
        return serializer.data


class PaymentPerformOperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
