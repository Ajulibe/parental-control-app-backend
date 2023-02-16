import mongoose, { Document, Schema } from 'mongoose';

export interface IMovieRating extends Document {
  user_id: number;
  movie_id: number;
  rating: number;
}

const MovieRatingSchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  movie_id: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

export const MovieRating = mongoose.model<IMovieRating>('MovieRating', MovieRatingSchema, 'movie_ratings');
