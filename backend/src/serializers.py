from rest_framework import serializers
from .models import *
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all(),
            message="This Email is already in use.")],
            )
    username = serializers.CharField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all(),
            message="This username  already exists.")]
            )



    def create(self,validated_data):
        try:
            User.objects.get(username=validated_data['username'],email=validated_data['email'],
            )
        except User.DoesNotExist :
            user = User.objects.create_user(validated_data['username'],
            validated_data['email'])
            user.set_password(validated_data['password'])
            user.is_admin = False
            user.save()
            return user
        else:
            raise serializers.ValidationError("email or username already in user")


    class Meta:
        model = User
        fields = ('username','email','password')

       

