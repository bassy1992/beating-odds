from django.contrib import admin

from .models import Attendee


@admin.register(Attendee)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'attendee_number', 'email', 'status', 'attendee_type', 'registered_at', 'checked_in')
    list_filter = ('status', 'attendee_type', 'checked_in')
    search_fields = ('id', 'full_name', 'email', 'telephone')
    readonly_fields = ('registered_at',)

    @admin.display(description='Attendee number')
    def attendee_number(self, attendee):
        return attendee.telephone
