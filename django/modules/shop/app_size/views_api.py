from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Size
from .serializers import SizeSerializer


class SizeAPIViewSet(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
