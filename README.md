# Clinic Management System (CMS)

Production-ready full-stack Clinic Management System with role-based access control, secure APIs, and responsive dashboard UI.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router, Axios, Context API
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs
- File Uploads: Cloudinary

## Folder Structure

```
Clinic Management System/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
    .env.example
  frontend/
    src/
      components/
      context/
      pages/
      services/
      utils/
      App.jsx
    .env.example
```

## Backend Setup

1. Open terminal:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env
```

4. Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Open terminal:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env
```

4. Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Implemented REST APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

- `GET /api/patients`
- `POST /api/patients`
- `PUT /api/patients/:id`
- `DELETE /api/patients/:id`
- `GET /api/patients/:id/history`

- `GET /api/doctors`
- `POST /api/doctors`

- `POST /api/appointments`
- `GET /api/appointments`
- `PATCH /api/appointments/:id/status`

- `POST /api/records`
- `GET /api/records/:patientId`

- `POST /api/billing`
- `GET /api/billing`
- `PATCH /api/billing/:id/status`

- `GET /api/dashboard/admin`
- `GET /api/dashboard/doctor`
- `GET /api/dashboard/receptionist`

## Security

- Helmet
- Express Rate Limit
- CORS allowlist
- JWT auth middleware
- Role-based authorization middleware
- Input validation via express-validator
- Password hashing with bcryptjs

## Deployment Guide

### Deploy Backend on Render

1. Push repository to GitHub.
2. Create a new Web Service in Render and link your repo.
3. Set root directory to `backend`.
4. Build Command:

```bash
npm install
```

5. Start Command:

```bash
npm start
```

6. Add environment variables from `backend/.env.example`.
7. Set `CLIENT_URL` to your deployed frontend URL.

### Deploy Frontend on Vercel

1. Import your repository in Vercel.
2. Set root directory to `frontend`.
3. Framework preset: Vite.
4. Build command:

```bash
npm run build
```

5. Output directory:

```bash
dist
```

6. Add `VITE_API_BASE_URL` with your Render backend URL + `/api`.

## Production Notes

- Use MongoDB Atlas in production.
- Use strong JWT secrets and rotate periodically.
- Add centralized logging and monitoring.
- Add test coverage (Jest + React Testing Library + Supertest).
