from rest_framework import serializers
from .models import DashboardCard, Product, SellingItem

# Dashboard card serializer
class DashboardCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardCard
        fields = ['id', 'label', 'today_sale', 'icon']

# Product serializer
class ProductSerializer(serializers.ModelSerializer):
    dashboard_card = DashboardCardSerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'dashboard_card', 'name', 'brand', 'details', 'price', 'image_src']

# Selling item serializer
class SellingItemSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = SellingItem
        fields = ['id', 'category', 'item_name', 'brand', 'quantity', 'unit_price', 'total_price']
