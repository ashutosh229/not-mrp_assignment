import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const connector = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connector;
  } catch (error) {}
};
