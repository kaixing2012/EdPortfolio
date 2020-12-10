from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import ProductItem
from .serializers import ProductItemSerializer


class ProductItemAPIViewSet(viewsets.ModelViewSet):
    queryset = ProductItem.objects.all()
    serializer_class = ProductItemSerializer
