import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import warmupRouter from "./routes/warmup.js";
import errorController from "./controllers/errorController.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", warmupRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/transactions", transactionRouter);

app.use(errorController);

export default app;
