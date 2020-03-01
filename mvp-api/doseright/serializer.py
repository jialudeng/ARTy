from rest_framework import serializers
from doseright.models import *

class AdministrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administration
        fields = '__all__'