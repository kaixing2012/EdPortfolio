from django.db.models import F, FloatField, Sum

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from ..app_shopping_cart.models import ShoppingCart

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

    @action(detail=False, methods=["GET"], url_path='view-my-payment')
    def view_my_payment(self, request, *args, **kwargs):
        if request.session.session_key:
            key = request.session.session_key
        else:
            key = self.request.META.get("HTTP_X_CSRFTOKEN", None)[0:32]

        if key:
            try:
                payment = Payment.objects.get(session_key=key)
                serializer = PaymentPerformGetSerializer(payment)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)
            except Payment.DoesNotExist as ex:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods=["POST"], url_path='create-my-payment')
    def create_my_payment(self, request, *args, **kwargs):
        if request.session.session_key:
            key = request.session.session_key
        else:
            key = self.request.META.get("HTTP_X_CSRFTOKEN", None)[0:32]

        if key:
            try:
                cart = ShoppingCart.objects.get(session_key=key)
            except ShoppingCart.DoesNotExist as ex:
                return Response(status=status.HTTP_404_NOT_FOUND)

            total_amount = cart.shoppingitem_set.aggregate(total=Sum(
                F('amount') * F('product__product_item__price'), output_field=FloatField()))['total']

            payment, created = Payment.objects.get_or_create(
                payment_serial_no=key, session_key=key, cart=cart)

            payment.total_amount = total_amount + 60 if total_amount < 1000 else total_amount
            payment.save()

            serializer = PaymentPerformGetSerializer(payment)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)
        else:
            return Response({}, status=status.HTTP_403_FORBIDDEN)
