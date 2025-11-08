// Vercel Serverless Function Entry Point
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import manhwaRoutes from './routes/manhwa.js';
import chapterRoutes from './routes/chapter.js';
import searchRoutes from './routes/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/manhwa', manhwaRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/search', searchRoutes);

// Root route - serve index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(404).send('Index page not found');
    }
  });
});

// Serve HTML files
app.get('/*.html', (req, res) => {
  const fileName = req.path.substring(1); // Remove leading slash
  const filePath = path.join(__dirname, 'public', fileName);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving ${fileName}:`, err);
      res.status(404).send('File not found');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Export for Vercel
export default app;
