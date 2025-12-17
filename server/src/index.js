import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import moviesRouter from './routes/movies.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/modern_code_review_demo';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/movies', moviesRouter);

async function start() {
  try {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Server failed!', err);
    process.exit(1);
  }
}

start();
