import { connectDB } from './backend/server/app.js';
import app from './backend/server/app.js';

const PORT = process.env.PORT || 10000;

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check endpoint: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();