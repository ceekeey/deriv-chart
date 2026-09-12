const mongoose = require('mongoose');

async function connectDB() {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not configured. Add it to server/.env before starting the server.');
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
}

module.exports = connectDB;
