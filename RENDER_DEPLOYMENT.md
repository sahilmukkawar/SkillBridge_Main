# SkillBridge Render Deployment Guide

This guide explains how to deploy the SkillBridge backend on Render.

## Prerequisites

1. A Render account (https://render.com)
2. A MongoDB database (MongoDB Atlas recommended)
3. SendGrid account for email functionality (optional but recommended)

## Deployment Steps

1. Fork this repository to your GitHub account
2. Log in to your Render dashboard
3. Click "New+" and select "Web Service"
4. Connect your GitHub account and select your forked repository
5. Configure the service:
   - Name: `skillbridge-backend`
   - Region: Choose the region closest to your users
   - Branch: `main` (or your preferred branch)
   - Root Directory: Leave empty
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables in the "Advanced" section:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `SENDGRID_API_KEY`: Your SendGrid API key (optional)
   - `SENDGRID_SENDER_EMAIL`: Your sender email address (optional)
   - `SENDGRID_SENDER_NAME`: Your sender name (optional)
7. Click "Create Web Service"

## Environment Variables

These environment variables are required for proper operation:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `NODE_ENV` - Set to "production" for production deployment

Optional variables for email functionality:
- `SENDGRID_API_KEY` - SendGrid API key for emails
- `SENDGRID_SENDER_EMAIL` - Sender email address
- `SENDGRID_SENDER_NAME` - Sender name

## Deployment Verification

After deployment, you can verify that your service is running by accessing:

- Health check: `https://YOUR_RENDER_APP.onrender.com/api/health`
- Root endpoint: `https://YOUR_RENDER_APP.onrender.com/`

## Troubleshooting

If you encounter issues:

1. Check the Render logs for error messages
2. Verify all environment variables are set correctly
3. Ensure the MongoDB connection string is valid
4. Check that the PORT environment variable is not hardcoded

The backend should be accessible at: `https://YOUR_RENDER_APP.onrender.com/`