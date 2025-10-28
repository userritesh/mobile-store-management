from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardCardViewSet, ProductViewSet, SellingItemViewSet

router = DefaultRouter()
router.register(r'dashboard', DashboardCardViewSet, basename='dashboard')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'selling-items', SellingItemViewSet, basename='selling-items')

urlpatterns = [
    path('api/', include(router.urls)),
]
