from rest_framework import serializers
from .models import Payment


class PaymentPerformGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
        depth = 2


class PaymentPerformOperateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
