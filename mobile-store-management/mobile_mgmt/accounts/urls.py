from django.urls import path
from .views import LoginView, RefreshView, LogoutView, MeView, UserViewSet, RegisterClientView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('refresh', RefreshView.as_view(), name='refresh'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('me', MeView.as_view(), name='me'),
    path('register/clients/', RegisterClientView.as_view(), name='register-client'),
]

# append router urls
urlpatterns += router.urls
