from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Gender
from .serializers import GenderSerializer


class GenderAPIViewSet(viewsets.ModelViewSet):
    queryset = Gender.objects.all()
    serializer_class = GenderSerializer
