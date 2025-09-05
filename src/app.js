import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import productRouter from "./routes/productRoutes";
import contactRouter from "./routes/contactRoutes";
import transactionRouter from "./routes/transactionRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "NOT@MRP Backend Running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/transactions", transactionRouter);

app.use((err, req, res, next) => {
  console.error("Unhandled error", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default app;
