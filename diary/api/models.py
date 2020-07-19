from datetime import date
from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver
import os


class EntryCollection(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='collections',
        on_delete=models.CASCADE)
    date = models.DateField(default=date.today)

    def hasMedicationEntries(self):
        return MedicationEntry.objects.filter(collection=self).count() > 0

    def hasPhotoEntries(self):
        return PhotoEntry.objects.filter(collection=self).count() > 0

    def hasDrinkEntries(self):
        return DrinkEntry.objects.filter(collection=self).count() > 0

    def hasTextEntries(self):
        return TextEntry.objects.filter(collection=self).count() > 0

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    'date',
                    'owner'],
                name='date_owner_unique')
        ]

    def __str__(self):
        return f'{str(self.date)} {str(self.owner)} {self.id}'


class PhotoEntry(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='photos',
        on_delete=models.CASCADE)
    collection = models.ForeignKey(
        EntryCollection,
        related_name='photos',
        on_delete=models.CASCADE)
    photo = models.FileField(upload_to='photos', max_length=255)
    caption = models.TextField(blank=True)


@receiver(models.signals.post_delete, sender=PhotoEntry)
def auto_delete_photo_on_delete(sender, instance, **kwargs):
    if instance.photo:
        if os.path.isfile(instance.photo.path):
            os.remove(instance.photo.path)


class MedicationAmount(models.Model):
    amount = models.IntegerField(unique=True)

    def __str__(self):
        return str(self.amount) + 'mg'


class Medication(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)


class MedicationEntry(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='medications',
        on_delete=models.CASCADE)
    collection = models.ForeignKey(
        EntryCollection,
        related_name='medications',
        on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    amount = models.ForeignKey(MedicationAmount, on_delete=models.CASCADE)
    time = models.TimeField()

    def __str__(self):
        return str(self.medication)


class TextEntry(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='texts',
        on_delete=models.CASCADE)
    text = models.TextField()
    collection = models.ForeignKey(
        EntryCollection,
        related_name='texts',
        on_delete=models.CASCADE)

    def __str__(self):
        return f'Entry from {self.collection.date}: {self.text[:10]}'


class DrinkTag(models.Model):
    tag_text = models.CharField(max_length=100)

    def __str__(self):
        return self.tag_text


class DrinkType(models.Model):
    name = models.CharField(max_length=100)
    tag = models.ManyToManyField(DrinkTag)

    def __str__(self):
        return self.name


class DrinkAmount(models.Model):
    amount = models.IntegerField(unique=True)

    def __str__(self):
        return str(self.amount)


class DrinkAmountExample(models.Model):
    example = models.CharField(max_length=100)
    drink_amount = models.ForeignKey(
        DrinkAmount,
        related_name='examples',
        on_delete=models.CASCADE)

    def __str__(self):
        return self.example


class DrinkEntry(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='drinks',
        on_delete=models.CASCADE)
    name = models.ForeignKey(DrinkType, on_delete=models.CASCADE)
    amount = models.ForeignKey(DrinkAmount, on_delete=models.CASCADE)
    collection = models.ForeignKey(
        EntryCollection,
        related_name='drinks',
        on_delete=models.CASCADE)
    time = models.TimeField()

    def __str__(self):
        return str(self.name)


class FoodTag(models.Model):
    text = models.CharField(max_length=100)

    def __str__(self):
        return self.text


class FoodEntry(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='foods',
        on_delete=models.CASCADE)
    collection = models.ForeignKey(
        EntryCollection,
        related_name='foods',
        on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    tags = models.ManyToManyField(FoodTag, blank=True)
