from rest_framework import serializers
from .models import Wonder


class WonderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wonder
        fields = "__all__"
