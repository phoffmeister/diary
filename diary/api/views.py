from .models import PhotoEntry, MedicationAmount, Medication, DrinkType, DrinkAmount, EntryCollection, FoodTag
from .serializers import UserSerializer, EntryCollectionSerializer, TextEntrySerializer, DrinkEntrySerializer, DaySerializer, MedicationEntrySerializer, PhotoEntrySerializer, FoodEntrySerializer
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_list_or_404, get_object_or_404
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import generics, permissions, viewsets, mixins, status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
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

class FoodTagsAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        tags = [{"id":a.id, "text":a.text} for a in FoodTag.objects.all().order_by('text')]
        return Response({"tags":tags})

class MedicationOptionsAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        amounts = [{"id":a.id, "amount":a.amount} for a in MedicationAmount.objects.all().order_by('amount')]
        names = [{"id":i.id, "name":i.name } for i in Medication.objects.all().order_by('name')]
        return Response({"amounts":amounts,"names": names})

class DrinkOptionsAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, format=None):
        types = [
                    {"id":a.id, "name":a.name, "tags":
                        [
                            {t.tag_text} for t in a.tag.all()
                        ]
                    }
                    for a in DrinkType.objects.all()
                ]
        amounts = [{"id":a.id, "amount":a.amount, "examples":[ex.example for ex in a.examples.all()]} for a in DrinkAmount.objects.all().order_by('amount')]
        return Response({"amounts":amounts,"types": types})

class EntryCollectionViewSet(
        mixins.CreateModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EntryCollectionSerializer

    def get_queryset(self):
        return self.request.user.collections.all().order_by('-date')

    def perform_create(self, serializer):
        coll = EntryCollection.objects.filter(
                date=serializer.validated_data['date'],
                owner=self.request.user).exists()
        if coll:
            raise ValidationError('There is already an entry for this date.')
        serializer.save(owner=self.request.user)

class CollectionEntryViewSet(
        mixins.CreateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FoodEntryViewSet(CollectionEntryViewSet):
    serializer_class = FoodEntrySerializer

    def get_queryset(self):
        return self.request.user.foods.all()


class TextEntryViewSet(CollectionEntryViewSet):
    serializer_class = TextEntrySerializer

    def get_queryset(self):
        return self.request.user.texts.all()


class DrinkEntryViewSet(CollectionEntryViewSet):
    serializer_class = DrinkEntrySerializer

    def get_queryset(self):
        return self.request.user.drinks.all()

class PhotoEntryViewSet(CollectionEntryViewSet):
    serializer_class = PhotoEntrySerializer

    def get_queryset(self):
        return self.request.user.photos.all()

class MedicationEntryViewSet(CollectionEntryViewSet):
    serializer_class = MedicationEntrySerializer

    def get_queryset(self):
        return self.request.user.medications.all()

