<div align="center">

# 🔧 VerifiedHands — Backend API

REST API powering **VerifiedHands**, a verified local skilled-worker marketplace for Bangladesh.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better--Auth-1F8A70?style=flat)](https://www.better-auth.com/)

[Frontend Repo](#) 

</div>

---

## 📌 Overview

This is the backend service for **VerifiedHands**. It exposes a REST API for worker profiles, job requests, reviews, and authentication, with role-based access control (Employer / Worker). Built with Express and TypeScript for type-safe request handling and data models.

---

## 🛠️ Tech Stack

| Purpose | Technology |
|---|---|
| Server framework | Express.js + TypeScript |
| Database | MongoDB with Mongoose ODM |
| Authentication | Better-Auth (email/password, JWT-based sessions) |
| Session/role verification | Server-side middleware — never trusts client-supplied roles |

---

## 🏗️ Folder Structure

```
src/
├── config/
│   ├── db.ts                # MongoDB connection
│   └── better-auth.ts       # Better-Auth configuration
├── models/
│   ├── User.ts
│   ├── WorkerProfile.ts
│   ├── JobRequest.ts
│   └── Review.ts
├── routes/
│   ├── auth.routes.ts
│   ├── worker.routes.ts
│   └── job.routes.ts
├── controllers/
│   ├── worker.controller.ts
│   └── job.controller.ts
├── middleware/
│   └── auth.middleware.ts   # JWT/session guard + role check
└── index.ts                  # App entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB connection string (local or MongoDB Atlas)

### Installation

```bash
git clone <backend-repo-url>
cd verifiedhands-backend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Run

```bash
npm run dev       # development (ts-node-dev, hot reload)
npm run build      # compile TypeScript to /dist
npm start           # run compiled build
```

---

## 🗄️ Database Schema

```
User
├── name, email, passwordHash
├── role: "employer" | "worker" | "admin"
└── phone, createdAt

WorkerProfile
├── userId (ref User)
├── trade, bio, description
├── rate, ratePeriod
├── location: { district, area }
├── skills: [String], availability
├── isVerified: Boolean, verificationDocs
├── avgRating, reviewCount, imageUrl
└── createdAt

JobRequest
├── employerId (ref User)
├── title, shortDescription, fullDescription
├── tradeNeeded, budget, location, preferredDate
├── status: "open" | "booked" | "closed"
└── createdAt

Review
├── workerId (ref WorkerProfile)
├── employerId (ref User)
├── rating (1–5), comment
└── createdAt
```

---

## 📡 API Reference

### Auth
| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/auth/sign-up/email` | Public |
| `POST` | `/api/auth/sign-in/email` | Public |
| `POST` | `/api/auth/sign-out` | Authenticated |
| `GET` | `/api/auth/get-session` | Authenticated |

### Workers
| Method | Endpoint | Access | Notes |
|---|---|---|---|
| `GET` | `/api/workers` | Public | Query params: `trade`, `location`, `minRating`, `sort`, `page` |
| `GET` | `/api/workers/:id` | Public | Single profile + reviews |
| `POST` | `/api/workers` | Worker (auth) | Create own profile |
| `PATCH` | `/api/workers/:id` | Owner worker (auth) | Update own profile |
| `DELETE` | `/api/workers/:id` | Owner worker (auth) | Delete own profile |

### Jobs
| Method | Endpoint | Access | Notes |
|---|---|---|---|
| `POST` | `/api/jobs` | Employer (auth) | Post a job request |
| `GET` | `/api/jobs` | Owner employer (auth) | List own posted jobs |
| `PATCH` | `/api/jobs/:id` | Owner employer (auth) | Update job/status |
| `DELETE` | `/api/jobs/:id` | Owner employer (auth) | Delete job |

### Reviews
| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/reviews` | Employer (auth) |

> All protected routes verify the session/JWT server-side via middleware and check the user's `role` before processing — role is never trusted from client input alone.

---

## 🔒 Authentication Flow

1. Client signs up/logs in via `/api/auth/sign-up/email` or `/api/auth/sign-in/email` (Better-Auth handles hashing + session creation).
2. Better-Auth sets an HTTP-only session cookie; the frontend sends requests with `credentials: "include"`.
3. Protected routes run through `auth.middleware.ts`, which verifies the session and attaches `req.user` (including `role`) before the controller executes.
4. Role-specific routes (e.g. `POST /api/jobs`) additionally check `req.user.role === "employer"` and reject with `403` otherwise.

---

