from django.urls import path

from . import views

urlpatterns = [
    path('attendees/', views.attendees, name='attendees'),
]
