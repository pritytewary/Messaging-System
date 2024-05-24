import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/conversation", conversationRoutes);

app.use((err, req, res, next) => {
  errorHandler(err, res);
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
