from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attendee',
            name='dietary_requirements',
        ),
        migrations.RemoveField(
            model_name='attendee',
            name='guest_count',
        ),
        migrations.RemoveField(
            model_name='attendee',
            name='notes',
        ),
    ]