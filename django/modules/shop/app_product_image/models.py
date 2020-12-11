from django.db import models


class ProductImage(models.Model):
    """ProductImage attributes"""

    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="product-images")

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "shop_product_image"

        # Set default ordering
        ordering = ["name"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
