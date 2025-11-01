# PennyWise — Backend

This scaffold provides a minimal Express + TypeScript backend with PostgreSQL (node-postgres).

Quick start (PowerShell) — run Postgres locally and start the backend

1. Install PostgreSQL on Windows. Two common options:

- Download the official installer from https://www.postgresql.org/download/windows/ and follow the setup steps.
- Or use Chocolatey (if you have it):

```powershell
choco install postgresql
```

2. Create a database and user (example using psql):

```powershell
psql -U postgres
CREATE DATABASE pennywise;
CREATE USER pennywise_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE pennywise TO pennywise_user;
\q
```

3. Configure the backend environment and run migrations:

```powershell
cd backend
copy .env.example .env
# Edit .env to use your DB credentials (DATABASE_URL)
npm install
npm run migrate:local
npm run dev
```

4. The dev server runs on http://localhost:4000 by default. API endpoints:

- GET /expenses
- POST /expenses { title, amount, date, category }
- PUT /expenses/:id
- DELETE /expenses/:id

Notes

- `npm run migrate:local` runs `backend/sql/init.sql` using a Node script and the `DATABASE_URL` from `.env` (works on Windows).
- If you later want to run the app with Docker, the repository still contains a `docker-compose.yml` but the project currently targets a local Postgres setup.
