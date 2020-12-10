from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Color
from .serializers import ColorSerializer


class ColorAPIViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
