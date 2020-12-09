from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Color
from .serializers import ColorSerializer


class ColorListAPI(APIView):
    """
    View all Colors.
    """

    def get(self, request, format=None):
        """
        Return a list of all Colors.
        """
        Colors = Color.objects.all()
        serializer = ColorSerializer(Colors, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a Color.
        """
        serializer = ColorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ColorDetailAPI(APIView):
    """
    Returns a single Color and allows updates and deletion of a Color.
    """

    def get_object(self, Color_id):
        try:
            return Color.objects.get(pk=Color_id)
        except Color.DoesNotExist:
            raise Http404

    def get(self, request, Color_id, format=None):
        Color = self.get_object(Color_id)
        serializer = ColorSerializer(Color)
        return Response(serializer.data)

    def put(self, request, Color_id, format=None):
        Color = self.get_object(Color_id)
        serializer = ColorSerializer(Color, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, Color_id, format=None):
        Color = self.get_object(Color_id)
        Color.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
