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
class Product(models.Model):
    dashboard_card = models.ForeignKey(DashboardCard, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50, blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    image_src = models.CharField(max_length=255, blank=True, null=True)

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
