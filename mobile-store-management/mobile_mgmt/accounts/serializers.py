from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        data['user'] = user
        return data


class UserSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    email = serializers.EmailField()
    roles = serializers.ListField(child=serializers.CharField(), allow_empty=True)


class TokenResponseSerializer(serializers.Serializer):
    accessToken = serializers.CharField()
    tokenType = serializers.CharField()
    expiresIn = serializers.IntegerField()
    refreshTokenIssued = serializers.BooleanField()
    user = UserSerializer()


User = get_user_model()


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Expose commonly needed fields; change as required
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff')
