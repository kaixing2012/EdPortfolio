from django.db import models

from ..app_product_item.models import ProductItem
from ..app_product_image.models import ProductImage
from ..app_size.models import Size
from ..app_color.models import Color
from ..app_gender.models import Gender
from ..app_category.models import Category


class Product(models.Model):
    product_item = models.ForeignKey(
        ProductItem, on_delete=models.CASCADE)

    product_image = models.ForeignKey(
        ProductImage, on_delete=models.CASCADE)

    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE)

    stock = models.PositiveIntegerField(default=0)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "shop_product"

        # Set default ordering
        ordering = ["id"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return f"{self.product_item.name}-{self.color.name}-{self.size.name}"
