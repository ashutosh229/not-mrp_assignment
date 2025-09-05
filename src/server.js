import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const server = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
};

server();
