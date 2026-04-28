from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import DashboardCard, Product, Productcategory, SellingItem,Stockcategory
from .serializers import DashboardCardSerializer, ProductSerializer, ProductcategorySerializer, SellingItemSerializer, StockcategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework import filters


# API for dashboard cards
class DashboardCardViewSet(viewsets.ModelViewSet):
    queryset = DashboardCard.objects.all()
    serializer_class = DashboardCardSerializer

# API for products
class ProductViewSet(viewsets.ModelViewSet): 
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'details', 'brand']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({
            "isSuccess": True,
            "message": "Product created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

   
        return Response({
            "isSuccess": True,
            "message": "Product updated successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    

# API for selling items (grid data)
class SellingItemViewSet(viewsets.ModelViewSet):
    queryset = SellingItem.objects.all()
    serializer_class = SellingItemSerializer

class StockcategoryViewSet(viewsets.ModelViewSet):
    queryset = Stockcategory.objects.all()
    serializer_class =StockcategorySerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({
            "isSuccess": True,
            "message": "Product created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

class ProductSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Productcategory.objects.all()
    serializer_class = ProductcategorySerializer

    @action(detail=False, methods=['get'])
    def categories(self, request):
        categories = Productcategory.objects.values_list('productcategory', flat=True).distinct()

        result = []
        for i, cat in enumerate(categories):
            result.append({
                "id": i + 1,
                "productcategory": cat
            })
        return Response(result, status=status.HTTP_200_OK)
