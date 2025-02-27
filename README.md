# MERN Voting System

## Overview
This is a MERN (MongoDB, Express.js, React, Node.js) stack-based Voting System where the backend is built using TypeScript and the frontend in JavaScript. The system supports two types of users: **Admin** and **User**. Users can register using their **Aadhar number** and **Voter ID**, cast their votes, and view results when the admin decides to make them public. The Admin has the authority to manage candidates and control result visibility.

## Features
### User
- Register using **Aadhar number** and **Voter ID**.
- Cast a vote for their preferred candidate.
- View results when the admin enables them.

### Admin
- Add new candidates.
- Update candidate details.
- Remove candidates from the election.
- View real-time vote counts at the backend.
- Control when the results are publicly displayed.

## Tech Stack
- **Frontend:** React (JavaScript)
- **Backend:** Node.js, Express.js (TypeScript)
- **Database:** MongoDB
- **Authentication:** JWT for security
- **Styling:** CSS / Tailwind
- **State Management:** Redux (optional for large-scale data handling)

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm / yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints
### User Endpoints
- `POST /api/auth/register` - Register a user with **Aadhar number** and **Voter ID**.
- `POST /api/auth/login` - Login user/admin.
- `POST /api/vote/:candidateId` - Cast a vote.
- `GET /api/results` - Fetch voting results (only when enabled by admin).

### Admin Endpoints
- `POST /api/admin/add-candidate` - Add a new candidate.
- `PUT /api/admin/update-candidate/:id` - Update candidate details.
- `DELETE /api/admin/remove-candidate/:id` - Remove a candidate.
- `GET /api/admin/vote-counts` - View vote counts (backend only).
- `PATCH /api/admin/show-results` - Enable/disable public results.

## Security Measures
- **JWT Authentication**: Protects endpoints and ensures only authenticated users and admins can access them.
- **Hashed Passwords**: Passwords are encrypted using bcrypt.
- **Data Validation**: Aadhar and Voter ID validation ensure only legitimate users can register.
