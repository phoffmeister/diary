from .models import PhotoEntry
from .serializers import UserSerializer, EntryCollectionSerializer, TextEntrySerializer, DrinkEntrySerializer, DaySerializer, MedicationEntrySerializer, PhotoEntrySerializer
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_list_or_404, get_object_or_404
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import generics, permissions, viewsets, mixins, status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def protected_media(request, path):
    file_name = request.path[request.path.rfind('/'):]
    photo = get_object_or_404(PhotoEntry, owner=request.user, photo__endswith=file_name)
    response = HttpResponse(status=200)
    response['Content-Type'] = ''
    response['X-Accel-Redirect'] = '/protected/' + path
    return response


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        AuthToken.objects.all().filter(user=user).delete()
        return super(LoginAPI, self).post(request, format=None)


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
        return self.request.user.collections.all().order_by('-date')

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

class PhotoEntryViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PhotoEntrySerializer

    def get_queryset(self):
        queryset = self.request.user.photos.all()
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

