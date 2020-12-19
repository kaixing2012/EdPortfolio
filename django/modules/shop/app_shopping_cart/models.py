from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class ShoppingCart(models.Model):
    """ShoppingCart attribute"""

    cart_serial_no = models.CharField(max_length=50)
    date_created = models.DateTimeField(default=timezone.now)
    session_key = models.CharField(max_length=40, null=True)

    # Meta data about the database table
    class Meta:
        # Set the table name
        db_table = "shop_shopping_cart"

        # Set default ordering
        ordering = ["date_created"]

    # Define what to output when the model is printed as string
    def __str__(self):
        return self.cart_serial_no
