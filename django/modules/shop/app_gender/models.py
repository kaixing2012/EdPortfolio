from django.db import models


class Gender(models.Model):
    """Gender attributes"""

    name = models.CharField(max_length=50)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "shop_gender"

        # Set default ordering
        ordering = ["id"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
