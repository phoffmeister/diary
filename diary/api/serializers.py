from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import EntryCollection, TextEntry, DrinkEntry, MedicationEntry, PhotoEntry

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class EntryCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntryCollection
        fields = ('id','date', 'hasTextEntries', 'hasMedicationEntries', 'hasDrinkEntries', 'hasPhotoEntries')

class TextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TextEntry
        fields = ('id', 'text', 'collection')

class DrinkEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DrinkEntry
        fields = ('id', 'name', 'amount', 'time', 'collection')

class MedicationEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationEntry
        fields = ('id', 'medication', 'amount', 'time', 'collection')

class PhotoEntrySerializer(serializers.ModelSerializer):
    photo = serializers.FileField(use_url=False)
    class Meta:
        model = PhotoEntry
        fields = ('id', 'photo', 'caption', 'collection')

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = EntryCollection
        fields = ('id', 'date', 'texts', 'drinks', 'medications', 'photos')

    class SimpleTextS(serializers.ModelSerializer):
        class Meta:
            model = TextEntry
            fields = ('id', 'text')

    class SimpleDrinkS(serializers.ModelSerializer):
        class Meta:
            model = DrinkEntry
            fields = ('id', 'name', 'amount', 'time')
            depth = 2

    class SimpleMedicationS(serializers.ModelSerializer):
        class Meta:
            model = MedicationEntry
            fields = ('id', 'medication', 'amount', 'time')
            depth = 1

    class SimplePhotoEntryS(serializers.ModelSerializer):
        photo = serializers.FileField(use_url=False)
        class Meta:
            model = PhotoEntry
            fields = ('id', 'photo', 'caption')

    texts = SimpleTextS(many=True, read_only=True)
    drinks = SimpleDrinkS(many=True, read_only=True)
    medications = SimpleMedicationS(many=True, read_only=True)
    photos = SimplePhotoEntryS(many=True, read_only=True)

