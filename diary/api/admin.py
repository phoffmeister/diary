from django.contrib import admin
from .models import *


class TextEntryAdmin(admin.ModelAdmin):
    list_display = ('day', 'text', 'owner')
    list_filter = ('day', 'owner')


class DrinkEntryAdmin(admin.ModelAdmin):
    list_display = ('day', 'time', 'name', 'amount', 'owner')
    list_filter = ('day', 'name', 'amount', 'owner')


class MedicationEntryAdmin(admin.ModelAdmin):
    list_display = ('day', 'time', 'medication', 'amount', 'owner')
    list_filter = ('day', 'medication', 'amount', 'owner')


class PhotoEntryAdmin(admin.ModelAdmin):
    list_display = ('day', 'photo', 'owner')


class DrinkTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_tags')

    def get_tags(self, obj):
        return "\n".join([t.tag_text for t in obj.tag.all()])


admin.site.register(DayEntry)
admin.site.register(TextEntry, TextEntryAdmin)

admin.site.register(DrinkEntry, DrinkEntryAdmin)
admin.site.register(DrinkTag)
admin.site.register(DrinkAmount)
admin.site.register(DrinkAmountExample)
admin.site.register(DrinkType, DrinkTypeAdmin)


admin.site.register(Medication)
admin.site.register(MedicationAmount)
admin.site.register(MedicationEntry, MedicationEntryAdmin)

admin.site.register(PhotoEntry, PhotoEntryAdmin)

admin.site.register(FoodEntry)
admin.site.register(FoodTag)

admin.site.register(HeadacheEntry)
admin.site.register(HeadacheTag)

