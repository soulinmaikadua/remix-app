import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectToDatabase(): Promise<void> {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Could not connect to MongoDB");
  }
}
