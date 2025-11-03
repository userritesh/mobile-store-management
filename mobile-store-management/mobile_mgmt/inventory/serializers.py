from rest_framework import serializers
from .models import DashboardCard, Product, SellingItem
import base64
import uuid
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from rest_framework import serializers

# Dashboard card serializer
class DashboardCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardCard
        fields = ['id', 'label', 'today_sale', 'icon']

# class ProductSerializer(serializers.ModelSerializer):
#     dashboard_card = DashboardCardSerializer(read_only=True)
    
#     class Meta:
#         model = Product
#         fields = ['id', 'dashboard_card', 'name', 'brand', 'details', 'price', 'image_src','productcategory']

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)
    image_src = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Product
        fields = ['id','name','productcategory','brand','details','price','image_src','image_url',]
        read_only_fields = ['image']

   
    def create(self, validated_data):
        base64_img = validated_data.pop('image_src', None)
        product = Product.objects.create(**validated_data)

        if base64_img:
            product.image = self._base64_to_image(base64_img)
            product.save()

        return product

    def update(self, instance, validated_data):
        base64_img = validated_data.pop('image_src', None)
        for attr,value in validated_data.items():
            setattr(instance, attr,value)

        if base64_img:
            instance.image = self._base64_to_image(base64_img)

        instance.save()
        return instance

    def _base64_to_image(self, base64_string):
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]

        image_data = base64.b64decode(base64_string)

        # detect image format using pillow
        img = Image.open(BytesIO(image_data))
        file_ext = img.format.lower()  # 'jpeg', 'png', etc.

        filename = f"{uuid.uuid4().hex[:12]}.{file_ext}"
        return ContentFile(image_data, name=filename)
        
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    


class SellingItemSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = SellingItem
        fields = ['id', 'category', 'item_name', 'brand', 'quantity', 'unit_price', 'total_price']
