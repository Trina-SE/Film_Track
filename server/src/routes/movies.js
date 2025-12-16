import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 }).lean();
  res.json(movies);
});

router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Validation failed', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const deleted = await Movie.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.status(204).end();
});

export default router;

