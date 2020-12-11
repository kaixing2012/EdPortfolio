from django.db import models


class ProductItem(models.Model):
    """ProductItem attributes"""

    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover = models.ImageField(upload_to="product-covers")

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "shop_product_item"

        # Set default ordering
        ordering = ["name"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
