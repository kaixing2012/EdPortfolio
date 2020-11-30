from rest_framework import serializers
from .models import Wonder


class WonderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wonder
        fields = ["id", "name"]


class WonderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wonder
        fields = "__all__"
