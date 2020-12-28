from django.db import models
from django.utils import timezone

from ..app_shopping_cart.models import ShoppingCart


class Payment(models.Model):
    """Payment attribute"""

    payment_serial_no = models.CharField(max_length=50)
    date_checked_out = models.DateTimeField(default=timezone.now)
    date_paid = models.DateTimeField(default=timezone.datetime.min)
    total_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)
    session_key = models.CharField(max_length=40, null=True)
    customer_name = models.CharField(max_length=50, blank=True)
    contact_no = models.CharField(max_length=50, blank=True)
    contact_email = models.EmailField(max_length=100, blank=True)
    cardholder_name = models.CharField(max_length=50, blank=True)
    card_number = models.CharField(max_length=50, blank=True)
    card_expiration = models.CharField(max_length=50, blank=True)
    card_cvv = models.CharField(max_length=50, blank=True)
    shipping_postal_code = models.PositiveIntegerField(default=0)
    shipping_street = models.CharField(max_length=50, blank=True)
    shipping_district = models.CharField(max_length=50, blank=True)
    shipping_ciry = models.CharField(max_length=50, blank=True)

    cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)

    # Meta data about the database table
    class Meta:
        # Set the table name
        db_table = "shop_payment"

        # Set default ordering
        ordering = ["date_checked_out"]

    # Define what to output when the model is printed as string
    def __str__(self):
        return self.cart_serial_no
