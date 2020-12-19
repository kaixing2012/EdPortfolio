from rest_framework import serializers

from .models import ShoppingCart

from ..app_shopping_item.serializers import ShoppingItemPerformGetSerializer


class ShoppingCartPerformGetSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField()

    class Meta:
        model = ShoppingCart
        fields = "__all__"

    def get_cart_items(self, instance):
        request = self.context.get('request')
        shopping_items = instance.shoppingitem_set.all()
        serializer = ShoppingItemPerformGetSerializer(
            shopping_items, many=True)

        for item in serializer.data:
            cover_url = item['product']['product_item']['cover']
            item['product']['product_item']['cover'] = request.build_absolute_uri(
                cover_url)

            image_url = item['product']['product_image']['image']
            item['product']['product_image']['image'] = request.build_absolute_uri(
                image_url)

        return serializer.data


class ShoppingCartPerformOperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = "__all__"
