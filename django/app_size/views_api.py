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
        Sizes = Size.objects.all()
        serializer = SizeSerializer(Sizes, many=True)
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

    def get_object(self, Size_id):
        try:
            return Size.objects.get(pk=Size_id)
        except Size.DoesNotExist:
            raise Http404

    def get(self, request, Size_id, format=None):
        Size = self.get_object(Size_id)
        serializer = SizeSerializer(Size)
        return Response(serializer.data)

    def put(self, request, Size_id, format=None):
        Size = self.get_object(Size_id)
        serializer = SizeSerializer(Size, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, Size_id, format=None):
        Size = self.get_object(Size_id)
        Size.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
