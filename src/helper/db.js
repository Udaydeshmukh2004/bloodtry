import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return;
    }

    try {
        const { connection } = await mongoose.connect(process.env.MONGO, {
            dbName: "bloodcare",
            serverSelectionTimeoutMS: 5000,
        });

        isConnected = connection.readyState === 1;
        console.log('db connected');
    } catch (error) {
        console.error("failed to connect to MongoDB:", error.message);
        throw error;
    }
};