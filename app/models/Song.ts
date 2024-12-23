import mongoose, { Schema, Document, Model } from "mongoose";

// Define TypeScript interface for User
export interface ISong extends Document {
  title: string;
  body: string;
  writer: string;
  singer: string;
  genre: string;
  posted_by: string;
  created_at: Date;
  url: string;
}

// Define Schema
const SongSchema: Schema<ISong> = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true},
  writer: { type: String, required: true },
  singer: { type: String, required: true },
  genre: { type: String, required: true },
  posted_by: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  url: { type: String, required: true },
});

// Create the Mongoose model
export const Song: Model<ISong> = mongoose.models.Song || mongoose.model<ISong>("Song", SongSchema);
