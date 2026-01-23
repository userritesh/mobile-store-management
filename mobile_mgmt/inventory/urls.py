from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardCardViewSet, ProductSubcategoryViewSet, ProductViewSet, SellingItemViewSet, StockcategoryViewSet

router = DefaultRouter()
router.register(r'dashboard', DashboardCardViewSet, basename='dashboard')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'selling-items', SellingItemViewSet, basename='selling-items')
router.register(r'stockcategory', StockcategoryViewSet, basename='stockcategory')
router.register(r'productSubcategor', ProductSubcategoryViewSet, basename='productSubcategor')

urlpatterns = [
    path('api/', include(router.urls)),
]
