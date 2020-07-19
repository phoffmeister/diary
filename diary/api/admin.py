from django.contrib import admin
from .models import *


class TextEntryAdmin(admin.ModelAdmin):
    list_display = ('collection', 'text', 'owner')
    list_filter = ('collection', 'owner')


class DrinkEntryAdmin(admin.ModelAdmin):
    list_display = ('collection', 'time', 'name', 'amount', 'owner')
    list_filter = ('collection', 'name', 'amount', 'owner')


class MedicationEntryAdmin(admin.ModelAdmin):
    list_display = ('collection', 'time', 'medication', 'amount', 'owner')
    list_filter = ('collection', 'medication', 'amount', 'owner')


class PhotoEntryAdmin(admin.ModelAdmin):
    list_display = ('collection', 'photo', 'owner')


class DrinkTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_tags')

    def get_tags(self, obj):
        return "\n".join([t.tag_text for t in obj.tag.all()])


admin.site.register(EntryCollection)
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
