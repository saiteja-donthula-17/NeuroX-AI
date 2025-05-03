import mongoose from "mongoose";

const connect = async () => {
  try {
    if (!process.env.MONGO) {
      throw new Error("MONGO connection string not defined in environment");
    }

    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

export default connect;