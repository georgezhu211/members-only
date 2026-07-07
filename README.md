# Members Only

A members-only messageboard built with Express and PostgreSQL. Users can sign up and post messages, but only members who enter the secret club passcode can see who authored each message. Admins get additional privileges to delete any message.

**[Live Demo](https://members-only-production-c059.up.railway.app)**

## Features

- User authentication (signup, login, logout) with Passport.js and bcrypt
- Role-based access:
  - **Visitors** — can view messages but not authors or timestamps
  - **Members** — can see message authors and timestamps (requires club passcode)
  - **Admins** — can delete any message (requires admin passcode)
- Full CRUD for messages
- Server-side rendered views with EJS and layouts
- Input validation using express-validator
- Session persistence with PostgreSQL

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL (via pg)
- **Views:** EJS with express-ejs-layouts
- **Auth:** Passport.js (local strategy) + bcryptjs
- **Validation:** express-validator
- **Sessions:** express-session + connect-pg-simple

## Prerequisites

- Node.js (v22+ recommended for `--env-file` and `--watch` support)
- PostgreSQL

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd members-only
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the sample env file and fill in your credentials:

   ```bash
   cp .env.sample .env
   ```

   Edit `.env`:

   ```env
   DB_URL="postgresql://user:password@localhost:5432/members_only"
   SESSION_SECRET="your-session-secret-here"
   CLUB_PASSCODE="your-club-passcode"
   ADMIN_PASSCODE="your-admin-passcode"
   ```

4. **Create the database**

   ```bash
   createdb members_only
   ```

5. **Seed the database**

   ```bash
   npm run seed
   ```

6. **Start the server**

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Scripts

| Script         | Description                             |
| -------------- | --------------------------------------- |
| `npm start`    | Start the dev server with file watching |
| `npm run seed` | Drop and recreate tables                |

## Project Structure

```
src/
├── app.js                  # Express app setup and entry point
├── config/
│   ├── db.js               # PostgreSQL connection pool
│   └── passport.js         # Passport local strategy setup
├── db/
│   └── seed.js             # Database seeding script
├── errors/                 # Custom error classes
├── middlewares/            # Shared middleware (auth, ID validation, passcode validation)
├── features/
│   ├── auth/               # Signup, login, logout routes, controller, validator
│   ├── home/               # Landing page
│   ├── messages/           # Message CRUD routes, controller, repository, validator
│   └── users/              # User profile, membership and admin upgrades
├── public/
│   └── styles.css          # Static CSS
└── views/
    ├── layout.ejs          # Shared layout
    ├── partials/           # Reusable partials (nav, errors)
    ├── auth/               # Auth views (login, signup)
    ├── messages/           # Message views (index, show, new, edit)
    └── users/              # User views (profile)
```

## Database Schema

### users

| Column        | Type        | Constraints                 |
| ------------- | ----------- | --------------------------- |
| id            | INTEGER     | Primary key, auto-generated |
| username      | TEXT        | UNIQUE, NOT NULL            |
| password_hash | TEXT        | NOT NULL                    |
| first_name    | TEXT        | NOT NULL                    |
| last_name     | TEXT        | NOT NULL                    |
| is_member     | BOOLEAN     | NOT NULL, default false     |
| is_admin      | BOOLEAN     | NOT NULL, default false     |
| created_at    | TIMESTAMPTZ | NOT NULL, default now()     |

### messages

| Column     | Type        | Constraints                                 |
| ---------- | ----------- | ------------------------------------------- |
| id         | INTEGER     | Primary key, auto-generated                 |
| user_id    | INTEGER     | Foreign key → users(id), cascades on delete |
| title      | TEXT        | NOT NULL                                    |
| content    | TEXT        | NOT NULL                                    |
| created_at | TIMESTAMPTZ | NOT NULL, default now()                     |
