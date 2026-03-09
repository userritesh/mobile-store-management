from django.contrib import admin

# Register your models here.
from .models import DashboardCard, Product, Productcategory, SellingItem, Stockcategory

admin.site.register(SellingItem)
admin.site.register(DashboardCard)
admin.site.register(Product)
admin.site.register(Stockcategory)
admin.site.register(Productcategory)
