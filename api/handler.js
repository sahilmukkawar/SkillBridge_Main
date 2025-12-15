import serverless from 'serverless-http';
import app from '../backend/server/app.js';

const handler = serverless(app);

export default async function (req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error('Serverless handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}
