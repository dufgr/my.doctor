# my.doctor

A responsive clinic management platform for organizing doctors, patients, appointments, and subscription billing. The application is built with Next.js and PostgreSQL, with email/password and optional Google authentication.

## Preview

Screenshots and a live demo will be added here.

## Core Features

- Clinic dashboard with appointment and revenue summaries
- Doctor availability and specialty management
- Patient records and appointment scheduling
- Responsive tables, forms, and navigation for desktop, tablet, and mobile
- Email/password authentication, with Google OAuth available when configured
- Stripe subscription checkout and customer portal integration

## Tech Stack

- Next.js 15.5.28 and React 19
- TypeScript 5
- Tailwind CSS 4 and shadcn/ui components
- React Day Picker 9 for date selection
- PostgreSQL 16 with Drizzle ORM and Drizzle Kit
- Better Auth, TanStack Query, and next-safe-action
- Stripe for subscription billing
- Docker Compose for local PostgreSQL

## Architecture

The App Router organizes public authentication and subscription routes separately from clinic pages. Server actions handle validated writes, while Drizzle schemas and relations define the PostgreSQL data model. Clinics own doctors, patients, and appointments; user-to-clinic relationships connect authenticated users to their clinic. Better Auth stores users, sessions, accounts, and verification records in the same database.

Protected routes and server actions verify the current session and clinic before accessing clinic data. The UI uses shared page, table, form, and sidebar components, with a 1280px maximum content width on larger screens.

## Local Development

### Requirements

- Node.js 22 or later
- npm
- Docker Desktop

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env.local`.

3. Generate a local Better Auth secret and set `BETTER_AUTH_SECRET` in `.env.local`. For example:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. Start the dedicated PostgreSQL container:

   ```bash
   docker compose up -d
   ```

5. Generate and apply the database migration:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

   The repository does not currently define seed data; create an account and clinic through the application.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open `http://localhost:3000`. With `LOCAL_AUTH_BYPASS=true`, the local demo user is signed in automatically and Google credentials are not required. Set the flag to `false` to test email/password registration and login instead. The bypass is disabled whenever `NODE_ENV=production`.

The example environment file contains local PostgreSQL settings. Stripe checkout and Google OAuth require their respective credentials; they are not needed for local email/password authentication.

## Validation

Run linting and a production build with:

```bash
npm run lint
npm run build
```

## Deployment

The app is structured for serverless deployment on Vercel. Configure a production PostgreSQL `DATABASE_URL`, a strong `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and any Google OAuth or Stripe credentials used in production. Apply Drizzle migrations against the production database before serving traffic. Vercel deployment has not been configured or performed as part of this repository setup.
