import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import { seedAdmin } from './utils/seedAdmin.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(s => s.trim()), credentials: false }));
app.use(express.json({ limit: '20kb' }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 150, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Explore Overseas API' }));
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

const port = process.env.PORT || 5000;
connectDB().then(seedAdmin).then(() => app.listen(port, () => console.log(`API running on port ${port}`)))
  .catch(error => { console.error('Server startup failed:', error.message); process.exit(1); });
