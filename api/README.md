# API

## Run

1. Copy `.env.example` to `.env` and adjust the database values if needed.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the API:

```bash
uvicorn app.main:app --reload
```

## Endpoints

- `GET /api/companies`
- `GET /api/programs`
- `GET /api/statuses`
- `GET /api/enrollments`
- `GET /api/enrollments/{id}`
- `POST /api/enrollments`
- `PUT /api/enrollments/{id}`
- `POST /api/enrollments/{id}/status`
- `GET /api/students`
- `GET /api/students/{id}`
- `POST /api/students`
- `PUT /api/students/{id}`
- `DELETE /api/students/{id}`

## Payloads

`POST` and `PUT /api/enrollments` expect:

```json
{
  "student_id": 1001,
  "program_id": 4,
  "status_id": 2,
  "enrollment_date": "2025-02-26"
}
```

`POST /api/enrollments/{id}/status` expects:

```json
{
  "new_status_code": "ACTIVE",
  "reason": "Student returned after resolving documentation issues"
}
```

`POST` and `PUT /api/students` expect:

```json
{
  "id": 1001,
  "first_name": "Luis",
  "last_name": "Cruz",
  "company_id": 4
}
```
