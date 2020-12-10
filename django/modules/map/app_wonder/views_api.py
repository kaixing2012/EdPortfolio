from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Wonder
from .serializers import WonderSerializer


class WonderListAPI(APIView):
    """
    View all Wonders.
    """

    def get(self, request, format=None):
        """
        Return a list of all Wonders.
        """
        wonders = Wonder.objects.all()
        serializer = WonderSerializer(wonders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a Wonder.
        """
        serializer = WonderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WonderDetailAPI(APIView):
    """
    Returns a single Wonder and allows updates and deletion of a Wonder.
    """

    def get_object(self, wonder_id):
        try:
            return Wonder.objects.get(pk=wonder_id)
        except Wonder.DoesNotExist:
            raise Http404

    def get(self, request, wonder_id, format=None):
        wonder = self.get_object(wonder_id)
        serializer = WonderSerializer(wonder)
        return Response(serializer.data)

    def put(self, request, wonder_id, format=None):
        wonder = self.get_object(wonder_id)
        serializer = WonderSerializer(wonder, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, wonder_id, format=None):
        wonder = self.get_object(wonder_id)
        wonder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
