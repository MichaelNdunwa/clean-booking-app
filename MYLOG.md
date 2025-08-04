# 🧾 MYLOG.md – Clean Booking App Project Setup Log

## ✅ Project Overview

- **Project Name**: `clean-booking-app`
- **Stack**: Django + PostgreSQL + Django REST Framework
- **Environment**: Python 3.x virtual environment

---

## 🔧 Step-by-Step Setup

### 📁 1. Clone Project Repository

```bash
git clone https://github.com/YOUR_USERNAME/clean-booking-app.git
cd clean-booking-app
```

---

### 🗂️ 2. Create Project Structure

```bash
mkdir backend frontend
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
```

---

### 📦 3. Install Required Packages

```bash
pip install django djangorestframework psycopg2-binary
```

---

### 🚀 4. Initialize Django Project

```bash
django-admin startproject config .
```

---

### 🔧 5. Create Django Apps

```bash
python3 manage.py startapp bookings 
python3 manage.py startapp users 
python3 manage.py startapp payments 
```

### ➕ Add to `INSTALLED_APPS` in `config/settings.py`:

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'bookings',
    'users',
    'payments',
]
```

---

### 📋 6. Freeze Dependencies

```bash
pip freeze > requirements.txt
```

---

### 🔄 7. Git Commit & Push

```bash
git add .
git commit -m "Initial Django project setup"
git push origin main
```

---

### 🛠️ 8. Setup PostgreSQL Database

Log in to PostgreSQL and run:

```sql
CREATE DATABASE clean_booking_db;
CREATE USER clean_user WITH PASSWORD 'securepass123';
ALTER ROLE clean_user SET client_encoding TO 'utf8';
ALTER ROLE clean_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE clean_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE clean_booking_db TO clean_user;
```

---

### 🔗 9. Connect Django to PostgreSQL

In `backend/config/settings.py`, update:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'clean_booking_db',
        'USER': 'clean_user',
        'PASSWORD': 'securepass123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

### 🧱 10. Apply Migrations

```bash
python manage.py makemigrations 
python manage.py migrate
```

---

### 🔑 11. Create Superuser

```bash
python manage.py createsuperuser
```

Use:

- **Username**: `admin`
- **Email**: `admin@admin.com`
- **Password**: `admin`

Admin panel available at: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

---

### 🟢 12. Run the Server

```bash
python manage.py runserver
```

Visit: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

✅ Your Django + PostgreSQL project is now running successfully.

---

### 🟢 13. Run the Frontend

```bash
cd frontend
python -m http.server 8000
```

Visit: [http://0.0.0.0:8000/](http://0.0.0.0:8000/)

---

✅ Your Django + PostgreSQL project is now running successfully.