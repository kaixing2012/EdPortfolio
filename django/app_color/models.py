from django.db import models


class Color(models.Model):
    """Color attributes"""

    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = "color"

        # Set default ordering
        ordering = ["name"]

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
