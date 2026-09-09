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

## Admin

```powershell
python manage.py createsuperuser
```

Open `http://127.0.0.1:8000/admin/` to manage registrations.
