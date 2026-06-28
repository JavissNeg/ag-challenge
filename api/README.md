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

- `GET /api/students`
- `GET /api/students/{id}`
- `POST /api/students`
- `PUT /api/students/{id}`
- `DELETE /api/students/{id}`

## Student payloads

`POST` and `PUT` expect:

```json
{
  "id": 1001,
  "first_name": "Luis",
  "last_name": "Cruz",
  "company_id": 4
}
```
