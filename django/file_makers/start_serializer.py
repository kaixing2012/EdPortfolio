import os
import sys


def create_serializer(serializer_name, file_path):

    base_path = f"{os.getcwd()}/"

    if not os.path.exists(f"{base_path}{file_path}"):
        os.makedirs(f"{file_path}")

    with open(os.path.join(f"{base_path}{file_path}", "serializer.py"), 'w') as f:
        script = (
            "from rest_framework import serializers\n"
            f"from .models import {serializer_name}\n\n\n"
            f"class {serializer_name}Serializer(serializers.Serializer):\n\t"
            "class Meta:\n\t\t"
            f"model={serializer_name}\n\t\t"
            "fields = '__all__'"
        )

        f.write(script)
        f.close


if __name__ == "__main__":
    serializer_name = str(sys.argv[1])
    file_path = ""

    if len(sys.argv) > 2:
        file_path = str(sys.argv[2])

    create_serializer(serializer_name, file_path)
