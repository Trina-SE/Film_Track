import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1888 },
    watched: { type: Boolean, default: false },
    review: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Movie', movieSchema);

