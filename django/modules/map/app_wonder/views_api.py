from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Wonder
from .serializers import WonderSerializer


class WonderAPIViewSet(viewsets.ModelViewSet):
    queryset = Wonder.objects.all()
    serializer_class = WonderSerializer
