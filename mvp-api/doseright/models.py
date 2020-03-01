from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# class User(AbstractUser):
#   is_careteam = models.BooleanField(default=False, null=False)
#   is_patient = models.BooleanField(default=True, null=False)


class Medication(models.Model):

  def __str__(self):
    return f"{self.brand_name}, {self.dosage}"
  
  generic_name = models.CharField(max_length=128)
  brand_name = models.CharField(max_length=128)
  dosage = models.CharField(max_length=20)
  formulation = models.CharField(max_length=20)
  usage = models.TextField()
  route = models.TextField()
  side_effects = models.TextField()
  storage = models.TextField()
  image = models.URLField()
  video = models.URLField()
  info = models.URLField()

class Administration(models.Model):
  date = models.DateTimeField()
  medication = models.ForeignKey(Medication, on_delete=models.PROTECT)
  dose = models.TextField()
  special_instructions = models.TextField()
  # patient = models.ForeignKey(User)



