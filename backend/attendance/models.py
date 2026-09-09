from django.db import models


class Attendee(models.Model):
    STATUS_CHOICES = [
        ('attending', 'Attending'),
        ('with_guests', 'Attending with guests'),
        ('virtual', 'Not sure yet'),
        ('declined', 'Unable to attend'),
    ]

    id = models.CharField(max_length=20, primary_key=True)
    full_name = models.CharField(max_length=160)
    telephone = models.CharField(max_length=40)
    email = models.EmailField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    guest_count = models.PositiveSmallIntegerField(default=0)
    attendee_type = models.CharField(max_length=80, blank=True)
    dietary_requirements = models.CharField(max_length=10, blank=True)
    notes = models.TextField(blank=True)
    registered_at = models.DateTimeField(auto_now_add=True)
    checked_in = models.BooleanField(default=False)

    class Meta:
        ordering = ['-registered_at']

    def __str__(self):
        return f'{self.full_name} ({self.id})'
