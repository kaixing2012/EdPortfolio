from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ProductItem
from .serializers import ProductItemSerializer


class ProductItemListAPI(APIView):
    """
    View all ProductItems.
    """

    def get(self, request, format=None):
        """
        Return a list of all ProductItems.
        """
        product_items = ProductItem.objects.all()
        serializer = ProductItemSerializer(product_items, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a ProductItem.
        """
        serializer = ProductItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductItemDetailAPI(APIView):
    """
    Returns a single ProductItem and allows updates and deletion of a ProductItem.
    """

    def get_object(self, product_item_id):
        try:
            return ProductItem.objects.get(pk=product_item_id)
        except ProductItem.DoesNotExist:
            raise Http404

    def get(self, request, product_item_id, format=None):
        product_item = self.get_object(product_item_id)
        serializer = ProductItemSerializer(product_item)
        return Response(serializer.data)

    def put(self, request, product_item_id, format=None):
        product_item = self.get_object(product_item_id)
        serializer = ProductItemSerializer(product_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_item_id, format=None):
        product_item = self.get_object(product_item_id)
        product_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
