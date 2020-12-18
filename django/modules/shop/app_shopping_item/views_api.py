from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from ..app_shopping_cart.models import ShoppingCart

from .models import ShoppingItem
from .serializers import ShoppingItemSerializer


class ShoppingItemAPIViewSet(viewsets.ModelViewSet):
    queryset = ShoppingItem.objects.all()
    serializer_class = ShoppingItemSerializer

    # def create(self, request, *args, **kwargs):

    #     print(request)
    # serializer = self.get_serializer(
    #     data=request.data, many=isinstance(request.data, list))
    # serializer.is_valid(raise_exception=True)
    # self.perform_create(serializer)
    # headers = self.get_success_headers(serializer.data)
    # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
