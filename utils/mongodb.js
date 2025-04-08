"use server";
import mongoose from 'mongoose';

let isConnected;

const connectMongoDB = async () => {
    const url = process.env.MONGO_DB.toString();

    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectMongoDB;
