# Generated by Django 3.1.3 on 2020-12-11 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('image', models.ImageField(upload_to='product_images')),
            ],
            options={
                'db_table': 'shop_product_image',
                'ordering': ['name'],
            },
        ),
    ]
