from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import ProductImage
from .serializers import ProductImageSerializer


class ProductImageAPIViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
