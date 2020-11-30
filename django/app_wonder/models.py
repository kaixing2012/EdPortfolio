from django.db import models


class Wonder(models.Model):
    """Wonder attributes"""

    name = models.CharField(max_length=50)
    lat = models.DecimalField(max_digits=19, decimal_places=10)
    lng = models.DecimalField(max_digits=19, decimal_places=10)
    category = models.CharField(max_length=50)

    # Meta data about the database table.
    class Meta:
        # Set the table name.
        db_table = 'wonder'

        # Set default ordering
        ordering = ['name']

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.name
