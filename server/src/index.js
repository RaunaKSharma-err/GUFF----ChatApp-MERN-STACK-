import express from "express";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import dotenv from "dotenv";
import { connectMongoDB } from "./lib/mongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log("server running on port:" + PORT);
  connectMongoDB();
});
