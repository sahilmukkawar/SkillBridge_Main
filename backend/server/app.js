import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import mentorsRoutes from './routes/mentors.js';
import teamRoutes from './routes/team.js';
import enrollmentsRoutes from './routes/enrollments.js';
import profilesRoutes from './routes/profiles.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import galleryRoutes from './routes/gallery.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json());

// Serve public static files (uploads, images, etc.)
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/mentors', mentorsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SkillBridge API is running' });
});

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set; skipping DB connection');
    return;
  }

  try {
    await mongoose.connect(uri, {
      // useUnifiedTopology and useNewUrlParser are default in mongoose v6+
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export default app;
