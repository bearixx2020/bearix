# Generated by Django 3.2.5 on 2021-07-11 13:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('site1', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='data',
            old_name='freq',
            new_name='freqs',
        ),
    ]
