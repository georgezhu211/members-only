# Members Only

A private messaging web app where only members can see who wrote a message. Built with Express, EJS, and PostgreSQL.

## Features

- Sign up / log in with username and password (bcrypt hashed)
- Guest users can read messages but can't see the author or timestamp
- Members unlock author and timestamp visibility by entering a club passcode
- Admins can delete any message

## Tech Stack

- Node.js + Express 5
- EJS + express-ejs-layouts
- PostgreSQL + pg
- Passport.js (local strategy)
- express-session with pg session store
- express-validator

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root:

```env
PORT=3000
DB_URL=postgresql://user:password@localhost:5432/members_only
SESSION_SECRET=your_session_secret
CLUB_PASSCODE=your_club_passcode
ADMIN_PASSCODE=your_admin_passcode
```

3. Seed the database (creates tables):

```bash
npm run seed
```

4. Start the dev server:

```bash
npm start
```

The app runs on `http://localhost:3000` by default.

## Routes

| Method | Path                   | Description       | Auth     |
| ------ | ---------------------- | ----------------- | -------- |
| GET    | `/`                    | Home page         | Public   |
| GET    | `/auth/signup`         | Signup form       | Public   |
| POST   | `/auth/signup`         | Create account    | Public   |
| GET    | `/auth/login`          | Login form        | Public   |
| POST   | `/auth/login`          | Authenticate      | Public   |
| GET    | `/auth/logout`         | Log out           | Public   |
| GET    | `/messages`            | All messages      | Required |
| GET    | `/messages/new`        | New message form  | Required |
| POST   | `/messages`            | Create message    | Required |
| GET    | `/messages/:id`        | View message      | Required |
| GET    | `/messages/:id/edit`   | Edit message form | Required |
| POST   | `/messages/:id/update` | Update message    | Required |
| POST   | `/messages/:id/delete` | Delete message    | Required |
| GET    | `/users/me`            | Profile page      | Required |
| POST   | `/users/me/membership` | Join the club     | Required |
| POST   | `/users/me/admin`      | Get admin access  | Required |

## Database Schema

```sql
users (id, username, password_hash, first_name, last_name, is_member, is_admin, created_at)
messages (id, user_id, title, content, created_at)
session (sid, sess, expire)
```
