import csv, sys
from datetime import datetime, timedelta
from doseright.models import *
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
      with open('doseright/management/commands/Fertility_Admins.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        next(csv_reader)
        for row in csv_reader:
          admin = Administration(
            start = datetime.strptime(row[0], '%Y-%m-%d %H:%M:%S'),
            end = datetime.strptime(row[1], '%Y-%m-%d %H:%M:%S'),
            medication = Medication.objects.get(id=int(row[2])), 
            dose = row[3],
            taken = row[4], 
            special_instructions = row[5], 
          )
          admin.save()
          
