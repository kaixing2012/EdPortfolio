# Generated by Django 3.1.3 on 2020-12-10 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app_size', '0002_auto_20201209_1615'),
        ('app_color', '0001_initial'),
        ('app_product_item', '0002_auto_20201210_1242'),
        ('app_gender', '0002_auto_20201209_1615'),
        ('app_category', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.PositiveIntegerField(default=0)),
                ('image', models.ImageField(upload_to='product_imgs')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_category.category')),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_color.color')),
                ('gender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_gender.gender')),
                ('productItem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_product_item.productitem')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_size.size')),
            ],
            options={
                'db_table': 'product',
                'ordering': ['id'],
            },
        ),
    ]
