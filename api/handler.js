import serverless from 'serverless-http';

// Import the Express app and DB connection
let app, connectDB;
try {
  // Import the app from the backend directory
  const appModule = await import('../backend/server/app.js');
  app = appModule.default;
  connectDB = appModule.connectDB;
  console.log('Successfully imported app module');
} catch (importError) {
  console.error('Failed to import app module:', importError);
  
  // Create a fallback express app for error handling
  const express = await import('express').then(mod => mod.default);
  app = express();
  app.get('/api/*', (req, res) => {
    res.status(500).json({ 
      error: 'API handler not properly configured',
      message: 'Failed to import backend application',
      detail: importError.message
    });
  });
}

let isConnected = false;
let handler;

if (app) {
  handler = serverless(app);
}

export default async function (req, res) {
  try {
    // Attempt to connect to DB if not already connected
    if (!isConnected && connectDB) {
      try {
        await connectDB();
        isConnected = true;
        console.log('Database connected successfully');
      } catch (dbError) {
        console.error('Database connection failed:', dbError);
        // Continue anyway as some endpoints might not need DB
      }
    }
    
    // Handle the request
    if (handler) {
      return await handler(req, res);
    } else {
      res.status(500).json({ 
        error: 'API handler not initialized',
        message: 'Backend application not available'
      });
    }
  } catch (error) {
    console.error('Serverless handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}