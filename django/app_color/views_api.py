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
        colors = Color.objects.all()
        serializer = ColorSerializer(colors, many=True)
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

    def get_object(self, color_id):
        try:
            return Color.objects.get(pk=color_id)
        except Color.DoesNotExist:
            raise Http404

    def get(self, request, color_id, format=None):
        color = self.get_object(color_id)
        serializer = ColorSerializer(color)
        return Response(serializer.data)

    def put(self, request, color_id, format=None):
        color = self.get_object(color_id)
        serializer = ColorSerializer(color, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, color_id, format=None):
        color = self.get_object(color_id)
        color.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
