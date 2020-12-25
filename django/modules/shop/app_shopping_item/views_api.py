
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from ..app_product.models import Product
from ..app_shopping_cart.models import ShoppingCart

from .models import ShoppingItem

from .serializers import ShoppingItemPerformGetSerializer, ShoppingItemPerformOperateSerializer


class ShoppingItemAPIViewSet(viewsets.ModelViewSet):
    queryset = ShoppingItem.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return ShoppingItemPerformGetSerializer
        if self.action in ("create", "update", "partial_update",):
            return ShoppingItemPerformOperateSerializer
        return ShoppingItemPerformGetSerializer

    @action(detail=False, methods=["POST"], url_path='add-to-cart')
    def add_to_cart(self, request, *args, **kwargs):
        if request.session.session_key:
            key = request.session.session_key
        else:
            key = self.request.META.get("HTTP_X_CSRFTOKEN", None)[0:32]

        if key:
            cart, created = ShoppingCart.objects.get_or_create(
                cart_serial_no=key, session_key=key)

            data = dict(
                item_no=len(cart.shoppingitem_set.all()) + 1,
                is_added=True,
                cart=cart,
                product=Product.objects.get(id=request.data["product"]["id"]),
                amount=request.data["amount"]
            )

            try:
                shopping_item = ShoppingItem.objects.get(
                    product=data["product"], cart=data["cart"])

                serializer = ShoppingItemPerformOperateSerializer(
                    shopping_item)

                headers = self.get_success_headers(serializer.data)

                return Response(serializer.data, status=status.HTTP_302_FOUND, headers=headers)

            except ShoppingItem.DoesNotExist as ex:
                shopping_item = ShoppingItem.objects.create(**data)

                serializer = ShoppingItemPerformOperateSerializer(
                    shopping_item)

                headers = self.get_success_headers(serializer.data)

                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods=["POST"], url_path='remove-from-cart')
    def remove_from_cart(self, request, *args, **kwargs):
        if request.session.session_key:
            key = request.session.session_key
        else:
            key = self.request.META.get("HTTP_X_CSRFTOKEN", None)[0:32]

        if key:
            data = dict(
                item_no=request.data["shopping_item"]["item_no"],
                cart=ShoppingCart.objects.get(
                    cart_serial_no=key, session_key=key),
                product=Product.objects.get(
                    id=request.data["shopping_item"]["product"]["id"]),
            )

            try:
                shopping_item = ShoppingItem.objects.get(item_no=data["item_no"],
                                                         product=data["product"], cart=data["cart"])

                serializer = ShoppingItemPerformOperateSerializer(
                    shopping_item)

                headers = self.get_success_headers(serializer.data)

                shopping_item.delete()

                HTTP_209_CONTENT_DELETED = 209

                return Response(serializer.data, status=HTTP_209_CONTENT_DELETED, headers=headers)

            except ShoppingItem.DoesNotExist as ex:
                return Response({}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({}, status=status.HTTP_403_FORBIDDEN)
