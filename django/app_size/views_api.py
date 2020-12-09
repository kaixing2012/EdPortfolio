from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Size
from .serializers import SizeSerializer


class SizeListAPI(APIView):
    """
    View all Sizes.
    """

    def get(self, request, format=None):
        """
        Return a list of all Sizes.
        """
        sizes = Size.objects.all()
        serializer = SizeSerializer(sizes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a Size.
        """
        serializer = SizeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SizeDetailAPI(APIView):
    """
    Returns a single Size and allows updates and deletion of a Size.
    """

    def get_object(self, size_id):
        try:
            return Size.objects.get(pk=size_id)
        except Size.DoesNotExist:
            raise Http404

    def get(self, request, size_id, format=None):
        size = self.get_object(size_id)
        serializer = SizeSerializer(size)
        return Response(serializer.data)

    def put(self, request, size_id, format=None):
        size = self.get_object(size_id)
        serializer = SizeSerializer(size, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, size_id, format=None):
        size = self.get_object(size_id)
        size.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
