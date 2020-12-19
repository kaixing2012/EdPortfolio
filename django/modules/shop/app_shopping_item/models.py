from django.db import models
from django.utils import timezone

from ..app_product.models import Product
from ..app_shopping_cart.models import ShoppingCart


class ShoppingItem(models.Model):
    """ShoppingItem attribute"""

    item_no = models.IntegerField()
    is_added = models.BooleanField()
    date_added = models.DateTimeField(default=timezone.now)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()

    # Meta data about the database table
    class Meta:
        # Set the table name
        db_table = "shop_shopping_item"

        # Set default ordering
        ordering = ["cart", "item_no"]

    # Define what to output when the model is printed as string
    def __str__(self):
        return f"{self.cart.id}-{self.item_no}"
