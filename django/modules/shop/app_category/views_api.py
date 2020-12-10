from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Category
from .serializers import CategorySerializer


class CategoryAPIViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
