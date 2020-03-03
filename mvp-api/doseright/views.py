from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from doseright.models import *
from doseright.serializer import *
import json

# Create your views here.

class Administrations(APIView):
  def get_object(self, pk):
      return Administration.objects.get(pk=pk)

  def get(self, request):
    admins = Administration.objects.all()
    serializer = AdministrationSerializer(admins, many=True)
    return Response(serializer.data)

  def patch(self, request, pk):
    admin = self.get_object(pk)
    serializer = AdministrationSerializer(admin, data=json.loads(request.body).get('data'), partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response("LOL", status=status.HTTP_400_BAD_REQUEST)

