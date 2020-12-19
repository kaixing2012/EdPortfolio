from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Product
from .serializers import ProductPerformGetSerializer, ProductPerformOperateSerializer


class ProductAPIViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return ProductPerformGetSerializer
        if self.action in ("create", "update", "partial_update",):
            return ProductPerformOperateSerializer
        return ProductPerformGetSerializer

    # Define list, retrieve, create, update, partial_update, and destroy methods.
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
