from django.shortcuts import render
from .models import *
from rest_framework import viewsets
# Create your views here.
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.views.generic.list import ListView
from django.views import View
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from django.db.models import Count
from ebaysdk.finding import Connection as find
import  json


class SignUp(APIView):
    permission_classes = (AllowAny,)


    def get(self,request):
        serializer = UserSerializer
        return Response({'serializer':serializer})

    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
