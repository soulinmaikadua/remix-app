import mongoose, { Schema, Document, Model } from 'mongoose'

// Define TypeScript interface for User
export interface ISong extends Document {
	title: string
	body: string
	writer?: string
	singer?: string
	genre?: string
	posted_by?: string
	created_at?: Date
	url: string
}

// Define Schema
const SongSchema: Schema<ISong> = new Schema({
	title: { type: String },
	body: { type: String },
	writer: { type: String },
	singer: { type: String },
	genre: { type: String },
	posted_by: { type: String },
	created_at: { type: Date, default: Date.now },
	url: { type: String, unique: true }
})

// Create the Mongoose model
export const Song: Model<ISong> = mongoose.models.Song || mongoose.model<ISong>('Song', SongSchema)
