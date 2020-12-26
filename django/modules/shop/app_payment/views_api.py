from django.http import Http404

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Payment
from .serializers import PaymentPerformGetSerializer, PaymentPerformOperateSerializer


class PaymentAPIViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return PaymentPerformGetSerializer
        if self.action in ("create", "update", "partial_update",):
            return PaymentPerformOperateSerializer
        return PaymentPerformGetSerializer
