from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import ProductItem
from .serializers import ProductItemSerializer


class ProductItemAPIViewSet(viewsets.ModelViewSet):
    queryset = ProductItem.objects.all()
    serializer_class = ProductItemSerializer

    # Define list, retrieve, create, update, partial_update, and destroy methods.
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
