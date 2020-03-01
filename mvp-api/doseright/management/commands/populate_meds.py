import csv, sys
from doseright.models import *
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
      with open('doseright/management/commands/Fertility_Meds.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        next(csv_reader)
        for row in csv_reader:
          med = Medication(
            generic_name = row[0],
            brand_name = row[1],
            dosage = row[2], 
            formulation = row[3],
            usage = row[4], 
            route = row[5], 
            side_effects = row[6],
            storage = row[7],
            image = row[8],
            info = row[9]
          )
          med.save()          
