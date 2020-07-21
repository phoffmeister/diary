from rest_framework import routers
from django.urls import path, include, re_path
from .views import LoginAPI, UserAPI, DayEntryViewSet, TextEntryViewSet, DrinkEntryViewSet, MedicationEntryViewSet, PhotoEntryViewSet, protected_media, MedicationOptionsAPI, DrinkOptionsAPI, FoodTagsAPI, FoodEntryViewSet, HeadacheEntryViewSet, HeadacheTagsAPI
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('api/day', DayEntryViewSet, 'day')
router.register('api/text', TextEntryViewSet, 'text')
router.register('api/drink', DrinkEntryViewSet, 'drink')
router.register('api/medication', MedicationEntryViewSet, 'medication')
router.register('api/photo', PhotoEntryViewSet, 'photo')
router.register('api/food', FoodEntryViewSet, 'food')
router.register('api/headache', HeadacheEntryViewSet, 'headache')

urlpatterns = [
    path('', include(router.urls)),
    path('api/opts/medication/', MedicationOptionsAPI.as_view()),
    path('api/opts/drink/', DrinkOptionsAPI.as_view()),
    path('api/opts/food/', FoodTagsAPI.as_view()),
    path('api/opts/headache/', HeadacheTagsAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path(
        'api/auth/logout/',
        knox_views.LogoutView.as_view(),
        name='knox_logout'),
]
