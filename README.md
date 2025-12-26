# VivaFemini Backend API

Backend API for VivaFemini - A women's health tracking application focused on menstrual cycle monitoring and symptom tracking.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Firebase Configuration](#firebase-configuration)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Module Structure](#module-structure)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🛠 Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK
- **Configuration**: @nestjs/config with dotenv
- **Testing**: Jest

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: v6.x or higher (local or MongoDB Atlas)
- **Firebase Project**: With Authentication enabled

## 🚀 Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Environment Setup

Create a `.env` file in the backend root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/vivafemini

# Server Configuration
PORT=3050

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Firebase Admin SDK (optional if using firebase-adminsdk.json)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Environment Variables Explained:

- `MONGODB_URI`: MongoDB connection string (local or Atlas)
- `PORT`: Port number for the API server (default: 3050)
- `FIREBASE_*`: Firebase Admin SDK credentials (alternative to JSON file)
- `FRONTEND_URL`: Frontend URL allowing the frontend communicate without hitting CORS error

## 🔥 Firebase Configuration

You need Firebase Admin SDK credentials to enable authentication. Choose one method:

### Method 1: Using JSON File (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Save the downloaded JSON file as `firebase-adminsdk.json` in the backend root directory

### Method 2: Using Environment Variables

Add Firebase credentials to your `.env` file (see Environment Setup section above).

**Note**: The `firebase-adminsdk.json` file is gitignored for security.

## 🌱 Database Seeding

The application includes a seeding script to populate the database with sample data.

### What Gets Seeded:

- **Articles** (3 records): Health and wellness articles
- **Quick Actions** (3 records): Dashboard quick action buttons
- **Symptom Categories** (5 records): Physical Pain, Mood & Mental, Period Indicators, Sexual Health, Digestion & Appetite
- **Health Tips** (2 records): Personalized health recommendations
- **Cycle Records** (3 records): Sample menstrual cycle data for the first user
- **Symptom Logs** (8 records): Sample symptom tracking entries
- **Symptom Frequencies** (5 records): Hardcoded percentage data for symptom analysis

### Running the Seed Script:

```bash
npm run seed
```

**Important Notes:**
- The script clears existing content data before seeding
- Tracking data (cycle records, symptom logs, symptom frequencies) is only seeded for the first registered user
- You must create a user account via the frontend before running the seed script for tracking data

## 🏃 Running the Application

### Development Mode (with hot-reload):
```bash
npm run start:dev
```

### Production Mode:
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Standard Mode:
```bash
npm run start
```

The API will be available at `http://localhost:3050` (or your configured PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:3050
```

### Authentication
All endpoints (except health check) require Firebase Authentication token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

### Available Modules

#### 1. **Content Module** (`/content`)
Manages static content for the application.

- `GET /content` - Get all content (articles, quick actions, symptom categories, health tips)
- `GET /content/articles` - Get all articles
- `GET /content/quick-actions` - Get quick action buttons
- `GET /content/symptom-categories` - Get symptom categories for tracking form
- `GET /content/health-tips` - Get health tips

#### 2. **Users Module** (`/users`)
Manages user profiles and authentication.

- `POST /users/register` - Register new user
- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update user profile (including profile picture upload)

#### 3. **Tracking Module** (`/tracking`)
Handles symptom and cycle tracking data entry.

- `GET /tracking/cycle-records?limit=12` - Get user's cycle records
- `POST /tracking/cycle-records` - Create new cycle record
- `GET /tracking/symptom-logs?startDate=&endDate=` - Get symptom logs
- `POST /tracking/symptom-logs` - Create new symptom log

#### 4. **Health Report Module** (`/health-report`)
Provides analytics and insights for the health report page.

- `GET /health-report/cycle-summary` - Get cycle summary (avg length, next period estimate, ovulation window)
- `GET /health-report/symptom-frequency` - Get symptom frequency percentages
- `GET /health-report/cycle-records?limit=12` - Get cycle records for charts
- `GET /health-report/symptom-logs?startDate=&endDate=` - Get symptom logs for historical data

## 🏗 Module Structure

```
src/
├── modules/
│   ├── auth/                    # Firebase authentication guard
│   │   ├── firebase-auth.guard.ts
│   │   └── auth.module.ts
│   │
│   ├── users/                   # User management
│   │   ├── schemas/
│   │   │   └── user.schema.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── content/                 # Static content management
│   │   ├── schemas/
│   │   │   ├── article.schema.ts
│   │   │   ├── quick-action.schema.ts
│   │   │   ├── symptom-category.schema.ts
│   │   │   └── health-tip.schema.ts
│   │   ├── content.controller.ts
│   │   ├── content.service.ts
│   │   └── content.module.ts
│   │
│   ├── tracking/                # Symptom and cycle tracking
│   │   ├── schemas/
│   │   │   ├── cycle-record.schema.ts
│   │   │   └── symptom-log.schema.ts
│   │   ├── tracking.controller.ts
│   │   ├── tracking.service.ts
│   │   └── tracking.module.ts
│   │
│   └── health-report/           # Health analytics and insights
│       ├── schemas/
│       │   └── symptom-frequency.schema.ts
│       ├── health-report.controller.ts
│       ├── health-report.service.ts
│       └── health-report.module.ts
│
├── firebase/                    # Firebase Admin configuration
│   ├── firebase.service.ts
│   └── firebase.module.ts
│
├── scripts/                     # Database seeding scripts
│   ├── seed-database.ts
│   └── seed-tracking-data.ts
│
├── app.module.ts               # Root module
└── main.ts                     # Application entry point
```

### Module Responsibilities:

- **Auth Module**: Firebase authentication guard for protecting routes
- **Users Module**: User registration, profile management, profile picture upload
- **Content Module**: Serves static content (articles, quick actions, symptom categories, health tips)
- **Tracking Module**: Handles data entry for symptom logs and cycle records
- **Health Report Module**: Provides analytics, cycle summaries, and symptom frequency data

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check your `MONGODB_URI` in `.env`

#### 2. Firebase Authentication Error
```
Error: Could not load the default credentials
```
**Solution**: Verify `firebase-adminsdk.json` exists in the backend root or check Firebase environment variables

#### 3. Seed Script Fails
```
Error: No users found. Skipping tracking data seeding.
```
**Solution**: Create a user account via the frontend first, then run `npm run seed`

### Getting Help

If you encounter issues not covered here:
1. Check the [NestJS Documentation](https://docs.nestjs.com)
2. Review the [MongoDB Documentation](https://docs.mongodb.com)
3. Check [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)

## 📝 Additional Scripts

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Build for production
npm run build
```

## 🔒 Security Notes

- Never commit `.env` file or `firebase-adminsdk.json` to version control
- Both files are included in `.gitignore`
- Use environment variables for production deployments
- Rotate Firebase credentials periodically
- Use MongoDB Atlas with IP whitelisting for production

## 📄 License

This project is proprietary and confidential.
