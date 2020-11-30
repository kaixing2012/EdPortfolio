from rest_framework import viewsets

from . import models
from . import serializers


class WonderApiView(viewsets.ModelViewSet):
    queryset = models.Wonder.objects.all()
    serializer_class = serializers.WonderSerializer
