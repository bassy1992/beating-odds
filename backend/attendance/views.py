import json
import secrets

from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError

from .models import Attendee


def serialize_attendee(attendee):
    return {
        'id': attendee.id,
        'fullName': attendee.full_name,
        'telephone': attendee.telephone,
        'email': attendee.email,
        'status': attendee.status,
        'guestCount': attendee.guest_count,
        'attendeeType': attendee.attendee_type,
        'dietaryRequirements': attendee.dietary_requirements,
        'notes': attendee.notes,
        'registeredAt': attendee.registered_at.isoformat(),
        'checkedIn': attendee.checked_in,
    }


def next_attendee_id():
    while True:
        attendee_id = f'BOF-{secrets.randbelow(9000) + 1000}'
        if not Attendee.objects.filter(id=attendee_id).exists():
            return attendee_id


@csrf_exempt
@require_http_methods(['GET', 'POST'])
def attendees(request):
    if request.method == 'GET':
        return JsonResponse({'attendees': [serialize_attendee(item) for item in Attendee.objects.all()]})

    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Request body must be valid JSON.'}, status=400)

    required_fields = ('fullName', 'telephone', 'email', 'status')
    missing_fields = [field for field in required_fields if not str(payload.get(field, '')).strip()]
    if missing_fields:
        return JsonResponse({'error': f'Missing required fields: {", ".join(missing_fields)}.'}, status=400)

    try:
        validate_email(payload['email'])
    except ValidationError:
        return JsonResponse({'error': 'Please provide a valid email address.'}, status=400)

    status = payload['status']
    valid_statuses = {choice[0] for choice in Attendee.STATUS_CHOICES}
    if status not in valid_statuses:
        return JsonResponse({'error': 'Invalid attendance status.'}, status=400)

    try:
        guest_count = max(0, int(payload.get('guestCount', 0)))
    except (TypeError, ValueError):
        return JsonResponse({'error': 'Guest count must be a number.'}, status=400)

    attendee = Attendee.objects.create(
        id=next_attendee_id(),
        full_name=str(payload['fullName']).strip(),
        telephone=str(payload['telephone']).strip(),
        email=str(payload['email']).strip().lower(),
        status=status,
        guest_count=guest_count,
        attendee_type=str(payload.get('attendeeType', '')).strip(),
        dietary_requirements=str(payload.get('dietaryRequirements', '')).strip(),
        notes=str(payload.get('notes', '')).strip(),
    )
    return JsonResponse(serialize_attendee(attendee), status=201)
