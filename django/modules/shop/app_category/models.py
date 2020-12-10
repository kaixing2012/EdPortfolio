from django.db import models


class Category(models.Model):
    """Category attributes"""

    name = models.CharField(max_length=50)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "category"

        # Set default ordering
        ordering = ["name"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
