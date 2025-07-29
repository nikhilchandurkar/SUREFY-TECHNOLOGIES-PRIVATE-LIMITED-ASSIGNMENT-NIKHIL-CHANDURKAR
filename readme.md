# Event Management API

A RESTful API built with Node.js, Express, PostgreSQL, and Prisma ORM for managing events and user registrations.

---

## Manual Setup (Local)

### 1. Prerequisites
- Node.js ≥ 18  
- PostgreSQL ≥ 12  
- npm or yarn

### 2. Install dependencies
```bash
npm install
```

### 3. Setup .env
Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/eventdb"
PORT=3000
```
Replace `<user>` and `<password>` with your PostgreSQL credentials.

### 4. Migrate Database
```bash
npx prisma migrate dev --name init
```
Or push schema directly without generating a migration:
```bash
npx prisma db push
```

### 5. Generate Prisma Client
```bash
npx prisma generate
```

### 6. Run the Server
```bash
npm run dev
```
Your API will be available at: `http://localhost:3000`

---

## Run with Docker

### 1. Build Docker Image
```bash
docker build -t event-api .
```

### 2. Run Docker Container
```bash
docker run -p 3000:3000 --env-file .env event-api
```
Ensure PostgreSQL is accessible to the container (e.g., use `host.docker.internal` or the correct host IP in your `.env`).

---

## Postman Usage

### 1. Import Postman Collection
- Open Postman
- Click Import
- Select the file: `postman/collection.json`

### 2. Run API Tests
You can use Postman Collection Runner to execute all tests manually.

Or run tests via terminal using Newman:
```bash
npx newman run postman/collection.json
```

### The collection includes tests for:
- Create Event
- Register User
- Prevent Duplicate Registrations
- Cancel Registration
- Get Event Statistics
- List Upcoming Events

---
