from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import DashboardCard, Product, Productcategory, SellingItem,Stockcategory, Mobile
from .serializers import DashboardCardSerializer, ProductSerializer, ProductcategorySerializer, SellingItemSerializer, StockcategorySerializer, MobileSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework import filters
from accounts.permissions import HasPermission


# Reusable base viewset to standardize API responses
class BaseModelViewSet(viewsets.ModelViewSet):
    """A small base class that provides a consistent success response
    payload used across viewsets in this app.
    """
    def success_response(self, data, message="", status_code=status.HTTP_200_OK, is_success=True):
        return Response({
            "isSuccess": is_success,
            "message": message,
            "data": data
        }, status=status_code)


# API for dashboard cards
class DashboardCardViewSet(BaseModelViewSet):
    queryset = DashboardCard.objects.all()
    serializer_class = DashboardCardSerializer

# API for products
class ProductViewSet(BaseModelViewSet): 
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'details', 'brand']
    permission_classes = [HasPermission]
    permission_required = {
        'list': ['product.view'],
        'retrieve': ['product.view'],
        'create': ['product.create'],
        'update': ['product.edit'],
        'partial_update': ['product.edit'],
        'destroy': ['product.delete'],
        'default': ['product.view']
    }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return self.success_response(serializer.data, message="Product created successfully", status_code=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

   
        return self.success_response(serializer.data, message="Product updated successfully", status_code=status.HTTP_200_OK)
    

# API for selling items (grid data)
class SellingItemViewSet(BaseModelViewSet):
    queryset = SellingItem.objects.all()
    serializer_class = SellingItemSerializer

class StockcategoryViewSet(BaseModelViewSet):
    queryset = Stockcategory.objects.all()
    serializer_class =StockcategorySerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return self.success_response(serializer.data, message="Stock category created successfully", status_code=status.HTTP_201_CREATED)

class ProductSubcategoryViewSet(BaseModelViewSet):
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
        return self.success_response(result, message="Categories fetched successfully", status_code=status.HTTP_200_OK)


class MobileViewSet(BaseModelViewSet):
    queryset = Mobile.objects.all().order_by('-created_at')
    serializer_class = MobileSerializer
    permission_classes = [HasPermission]
    permission_required = {
        'list': ['mobile.list'],
        'retrieve': ['mobile.view'],
        'create': ['mobile.add'],
        'update': ['mobile.edit'],
        'partial_update': ['mobile.edit'],
        'destroy': ['mobile.delete'],
        'default': ['mobile.list']
    }

