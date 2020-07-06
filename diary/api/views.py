from rest_framework import generics, permissions, viewsets, mixins
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import LoginSerializer, UserSerializer, EntryCollectionSerializer, TextEntrySerializer, DrinkEntrySerializer, DaySerializer, MedicationEntrySerializer
from django.shortcuts import get_list_or_404

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token            })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
            permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class DayAPI(
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = DaySerializer

    def get_queryset(self):
        return self.request.user.collections.all()

class EntryCollectionViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = EntryCollectionSerializer

    def get_queryset(self):
        return self.request.user.collections.all().order_by('date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TextEntryViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = TextEntrySerializer

    def get_queryset(self):
        queryset = self.request.user.texts.all()
        collection = self.request.query_params.get('collection', None)
        if collection:
            return get_list_or_404(queryset, collection__id=collection)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class DrinkEntryViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = DrinkEntrySerializer

    def get_queryset(self):
        queryset = self.request.user.drinks.all()
        collection = self.request.query_params.get('collection', None)
        if collection:
            return get_list_or_404(queryset, collection__id=collection)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class MedicationEntryViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = MedicationEntrySerializer

    def get_queryset(self):
        queryset = self.request.user.medications.all()
        collection = self.request.query_params.get('collection', None)
        if collection:
            return get_list_or_404(queryset, collection__id=collection)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

