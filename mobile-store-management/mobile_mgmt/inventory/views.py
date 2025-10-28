from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import DashboardCard, Product, SellingItem
from .serializers import DashboardCardSerializer, ProductSerializer, SellingItemSerializer

# API for dashboard cards
class DashboardCardViewSet(viewsets.ModelViewSet):
    queryset = DashboardCard.objects.all()
    serializer_class = DashboardCardSerializer

# API for products
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# API for selling items (grid data)
class SellingItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SellingItem.objects.all()
    serializer_class = SellingItemSerializer
