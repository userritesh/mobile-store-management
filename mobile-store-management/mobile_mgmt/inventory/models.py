from django.db import models
class DashboardCard(models.Model):
    label = models.CharField(max_length=50)
    today_sale = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    icon = models.ImageField(upload_to='', blank=True, null=True)

    def __str__(self):
        return self.label

# 1) Top Category (example: Mobile, Accessories, Computers)
class Stockcategory(models.Model):
    stockcategory = models.CharField(max_length=50)
    icon_img = models.ImageField(upload_to='stockcategory/', blank=True, null=True)

    def __str__(self):
        return self.stockcategory


# 2) Sub Category (example: Mobile → iPhone, Android / Accessories → Charger, Cable)
class Productcategory(models.Model):
    stockcategory = models.ForeignKey(Stockcategory, on_delete=models.CASCADE, related_name='productcategories')
    productcategory = models.CharField(max_length=50)
    ico_img = models.ImageField(upload_to='productcategory/', blank=True, null=True)

    def __str__(self):
        return f"{self.productcategory} ({self.stockcategory})"


# 3) Products
class Product(models.Model):
    name = models.CharField(max_length=100)
    productcategory = models.ForeignKey(Productcategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    brand = models.CharField(max_length=50, blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # actual image file
    image = models.ImageField(upload_to='products/', blank=True, null=True)

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
