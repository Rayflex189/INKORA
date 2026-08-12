# INKORA — Deployment & Infrastructure Guide

This guide details how to deploy Inkora natively to Vercel, inside Docker containers, or locally for development.

---

## 1. Native Next.js Deployment (Vercel)

Preferred workflow:
```text
GitHub → Vercel → Next.js
```

### Steps:
1. Push your repository to **GitHub**.
2. Log into **Vercel** and select **Import Project**.
3. Select the `INKORA` repository.
4. Configure Environment Variables in Vercel settings:
   - `DATABASE_URL`: Production PostgreSQL database connection string.
   - `AUTH_SECRET`: Secret JWT key.
   - `ADMIN_USERNAME`: Administrator username (e.g., `admin`).
   - `ADMIN_PASSWORD`: Initial administrator password.
   - `NEXT_PUBLIC_APP_URL`: Production domain (e.g., `https://inkora.app`).
5. Deploy. Vercel automatically runs `npx prisma generate` and `npm run build`.
6. Run initial database migration & seeding:
   ```bash
   npx prisma migrate deploy
   npx tsx prisma/seed.ts
   ```

---

## 2. Containerized Deployment (Docker)

Inkora includes a production-grade multi-stage `Dockerfile`.

### Building the Image:
```bash
docker build -t inkora .
```

### Running Locally:
```bash
docker run --env-file .env.local -p 3000:3000 inkora
```

Verify application health at `http://localhost:3000/api/health`.

### Supported Cloud Container Hosts:
- Render
- Railway
- Fly.io
- AWS ECS / App Runner
- Google Cloud Run
- DigitalOcean App Platform

---

## 3. Local Development

### Prerequisites:
- Node.js 22+
- npm 10+

### Setup:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment placeholders:
   ```bash
   cp .env.example .env
   ```
3. Synchronize database schema & seed initial admin:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Access Inkora at `http://localhost:3000`. Log in to Admin Studio at `http://localhost:3000/admin`.
