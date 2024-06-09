# Job Management Dashboard

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   cd job-management-server

2. Install dependencies:
   npm install

3. Start the server:
   node index.js

The backend server will run on http://localhost:3300.

### API Endpoints

1. GET /jobs
   Retrieves all jobs.
2. GET /jobs/
   Retrieves a specific job by ID
3. POST /jobs
   Adds a new job record.
4. PUT /jobs/:id
   Updates an existing job record.
5. DELETE /jobs/:id
   Deletes a job record.

### Frontend

1. Navigate to the frontend directory:
   cd job-management-frontend

2. Install dependencies:
   npm install

3. Start the React application:
   npm start

The frontend server will run on http://localhost:3300 and will proxy API requests to the backend server.
