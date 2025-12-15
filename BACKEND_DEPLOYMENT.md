# SkillBridge Backend Deployment Guide

This guide explains how to deploy the SkillBridge backend independently on Vercel.

## Deployment Structure

The backend is structured as a serverless application using Express.js, deployed through Vercel's serverless functions.

## Key Components

1. **API Handlers** - Located in the `/api` directory:
   - `handler.js` - Main API handler that imports and runs the Express app
   - `health.js` - Health check endpoint
   - `test.js` - Test endpoint
   - `db-test.js` - Database connection test endpoint

2. **Express Application** - Located in `/backend/server`:
   - `app.js` - Main Express application with all routes
   - `routes/` - API route definitions
   - `models/` - Database models
   - `middleware/` - Custom middleware
   - `services/` - External services (email, etc.)

## Deployment Endpoints

After deployment, the following endpoints will be available:

- `GET /api/health` - Health check
- `GET /api/test` - Test endpoint
- `GET /api/db-test` - Database connection test
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- All other API endpoints as defined in the routes

## Environment Variables

Ensure the following environment variables are set in your Vercel project:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `SENDGRID_API_KEY` - SendGrid API key for emails
- `SENDGRID_SENDER_EMAIL` - Sender email address
- `SENDGRID_SENDER_NAME` - Sender name
- `FRONTEND_URL` - URL of your frontend application

## Deployment Process

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Vercel will automatically detect and deploy using the `vercel.json` configuration
4. Test the deployment using the health check endpoint: `GET /api/health`

## Troubleshooting

If you encounter issues:

1. Check the Vercel logs for error messages
2. Verify all environment variables are set correctly
3. Ensure the MongoDB connection string is valid
4. Test individual endpoints to isolate issues

The backend should be accessible at: `https://your-vercel-app.vercel.app/api/health`