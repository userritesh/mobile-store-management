from django.db import models

# Create your models here.
from django.db import models

# Dashboard card (tabs)
from django.db import models

class DashboardCard(models.Model):
    label = models.CharField(max_length=50)
    today_sale = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    icon = models.ImageField(upload_to='', blank=True, null=True)

    def __str__(self):
        return self.label


# Products (like accessories, phones, tablets)
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    productcategory = models.CharField(max_length=50, blank=True, null=True)
    brand = models.CharField(max_length=50, blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # this will store actual image file
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    # DO NOT store base64 here anymore (remove image_src from DB)
    # base64 will only be used temporarily in serializer, not in DB

    def __str__(self):
        return f"{self.name} ({self.brand})"


# Selling Items (grid data)
class SellingItem(models.Model):
    category = models.CharField(max_length=50)
    item_name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=0)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @property
    def total_price(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.item_name} ({self.brand})"
