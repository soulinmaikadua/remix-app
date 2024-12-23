import mongoose, { Schema, Document, Model } from "mongoose";

// Define TypeScript interface for User
export interface IUser extends Document {
  name: string;
  url: string;
  created_at: Date;
}

// Define Schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

// Create the Mongoose model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
