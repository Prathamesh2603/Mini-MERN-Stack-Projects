// External Module
const { default: mongoose } = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error while connecting to MongoDB",error);
  }
}

module.exports = connectDB;
