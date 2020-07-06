from rest_framework import routers
from django.urls import path, include, re_path
from .views import LoginAPI, UserAPI, EntryCollectionViewSet, TextEntryViewSet, DrinkEntryViewSet, DayAPI, MedicationEntryViewSet, PhotoEntryViewSet, protected_media
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('api/collection', EntryCollectionViewSet, 'collection')
router.register('api/day', DayAPI, 'day')
router.register('api/text', TextEntryViewSet, 'text')
router.register('api/drink', DrinkEntryViewSet, 'drink')
router.register('api/medication', MedicationEntryViewSet, 'medication')
router.register('api/photo', PhotoEntryViewSet, 'photo')

urlpatterns = [
    path('', include(router.urls)),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    re_path('^media/(?P<path>.*)$', protected_media, name='protected_media'),
]
