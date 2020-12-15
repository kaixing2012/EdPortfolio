from django.db import models


class Size(models.Model):
    """Size attributes"""

    name = models.CharField(max_length=50)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "shop_size"

        # Set default ordering
        ordering = ["id"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
