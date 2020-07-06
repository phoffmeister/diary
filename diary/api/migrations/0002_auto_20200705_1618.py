# Generated by Django 3.0.8 on 2020-07-05 16:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drinkentry',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='drink', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='entrycollection',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collection', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='medicationentry',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medication', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='photoentry',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photo', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='textentry',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='text', to=settings.AUTH_USER_MODEL),
        ),
    ]