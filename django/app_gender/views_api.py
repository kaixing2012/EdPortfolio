from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Gender
from .serializers import GenderSerializer


class GenderListAPI(APIView):
    """
    View all Genders.
    """

    def get(self, request, format=None):
        """
        Return a list of all Genders.
        """
        genders = Gender.objects.all()
        serializer = GenderSerializer(genders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Create a Gender.
        """
        serializer = GenderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GenderDetailAPI(APIView):
    """
    Returns a single Gender and allows updates and deletion of a Gender.
    """

    def get_object(self, gender_id):
        try:
            return Gender.objects.get(pk=gender_id)
        except Gender.DoesNotExist:
            raise Http404

    def get(self, request, gender_id, format=None):
        gender = self.get_object(gender_id)
        serializer = GenderSerializer(gender)
        return Response(serializer.data)

    def put(self, request, gender_id, format=None):
        gender = self.get_object(gender_id)
        serializer = GenderSerializer(gender, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, gender_id, format=None):
        gender = self.get_object(gender_id)
        gender.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
