import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
    const DB_URL = process.env.DB_URL as string;
    try {
        await mongoose.connect(DB_URL || "mongodb+srv://zsherif308:xuyfkxhnaigdBXQ6@cluster0.4t3pk.mongodb.net/");
        console.log('Connected to database');
    } catch (error) {
        console.log('Could not connect to database: ', error);
    }
};

export default connectDB;