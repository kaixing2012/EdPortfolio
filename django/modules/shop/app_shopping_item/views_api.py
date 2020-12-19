from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

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

    # Define list, retrieve, create, update, partial_update, and destroy methods.
    def create(self, request, *args, **kwargs):
        # session_key = request.session.session_key
        # cart, created = ShoppingCart.objects.get_or_create(
        #     cart_serial_no=session_key, session_key=session_key)
        print(request.data)
        print(request.session.session_key)

    # serializer = self.get_serializer(
    #     data=request.data, many=isinstance(request.data, list))
    # serializer.is_valid(raise_exception=True)
    # self.perform_create(serializer)
    # headers = self.get_success_headers(serializer.data)
    # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
