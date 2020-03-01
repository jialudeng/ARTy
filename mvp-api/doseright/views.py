from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from doseright.models import *
from doseright.serializer import *

# Create your views here.

class Administrations(APIView):
  def get(self, request):
    admins = Administration.objects.all()
    serializer = AdministrationSerializer(admins, many=True)
    return Response(serializer.data)