from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0002_remove_attendee_removed_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendee',
            name='status',
            field=models.CharField(
                choices=[
                    ('attending', 'Attending'),
                    ('virtual', 'Not sure yet'),
                    ('declined', 'Unable to attend'),
                ],
                max_length=20,
            ),
        ),
    ]