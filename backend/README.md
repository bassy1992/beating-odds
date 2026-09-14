# Attendance API

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
```

## Run

```powershell
python manage.py runserver 8000
```

The React app proxies `/api` to `http://127.0.0.1:8000` during development.

## Deploy to Railway

Create a Railway service from this repository and set its **Root Directory** to
`backend`. Railway will use `railway.toml` and the Nixpacks Python builder.

Add these service variables:

- `DJANGO_SECRET_KEY`: a long random production secret
- `DJANGO_ALLOWED_HOSTS`: the Railway domain, for example `my-api.up.railway.app`
- `CORS_ALLOWED_ORIGINS`: the deployed frontend origin
- `CSRF_TRUSTED_ORIGINS`: the deployed frontend origin when browser requests need CSRF protection
- `DATABASE_URL`: provided automatically by an attached Railway PostgreSQL service

The service runs migrations and collects static files before Gunicorn starts.
Railway health checks use `/api/health/`.

## Admin

```powershell
python manage.py createsuperuser
```

Open `http://127.0.0.1:8000/admin/` to manage registrations.
