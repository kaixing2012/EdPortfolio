from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from ..app_shopping_item.serializers import ShoppingItemPerformGetSerializer

from .models import ShoppingCart

from .serializers import ShoppingCartPerformGetSerializer, ShoppingCartPerformOperateSerializer


class ShoppingCartAPIViewSet(viewsets.ModelViewSet):
    queryset = ShoppingCart.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return ShoppingCartPerformGetSerializer
        if self.action in ("create", "update", "partial_update",):
            return ShoppingCartPerformOperateSerializer
        return ShoppingCartPerformGetSerializer

    @action(detail=False, methods=["GET"], url_path='view-my-cart')
    def view_my_cart(self, request, *args, **kwargs):
        if request.session.session_key:
            key = request.session.session_key
        else:
            key = self.request.META.get("HTTP_X_CSRFTOKEN", None)[0:32]

        try:
            shopping_cart = ShoppingCart.objects.get(session_key=key)
            shopping_items = shopping_cart.shoppingitem_set.all()
            item_serializer = ShoppingItemPerformGetSerializer(
                shopping_items, many=True)

            for item in item_serializer.data:
                cover_url = item['product']['product_item']['cover']
                item['product']['product_item']['cover'] = request.build_absolute_uri(
                    cover_url)

                image_url = item['product']['product_image']['image']
                item['product']['product_image']['image'] = request.build_absolute_uri(
                    image_url)

            data = dict(
                id=shopping_cart.id,
                cart_serial_no=shopping_cart.cart_serial_no,
                session_key=shopping_cart.session_key,
                date_created=shopping_cart.date_created,
                cart_items=item_serializer.data
            )

            headers = self.get_success_headers(data)
            return Response(data, status=status.HTTP_200_OK, headers=headers)
        except ShoppingCart.DoesNotExist as ex:
            return Response(status=status.HTTP_404_NOT_FOUND)
