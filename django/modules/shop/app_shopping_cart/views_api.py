from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

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
