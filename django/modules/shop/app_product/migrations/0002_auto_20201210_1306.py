# Generated by Django 3.1.3 on 2020-12-10 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_product', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='productItem',
            new_name='product_item',
        ),
    ]