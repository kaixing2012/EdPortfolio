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

            serializer = ShoppingCartPerformGetSerializer(
                shopping_cart, context={"request": request})

            headers = self.get_success_headers(serializer.data)

            return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)
        except ShoppingCart.DoesNotExist as ex:
            return Response(status=status.HTTP_404_NOT_FOUND)
