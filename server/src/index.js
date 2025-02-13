import express from "express";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import dotenv from "dotenv";
import { connectMongoDB } from "./lib/mongoDB.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log("server running on port:" + PORT);
  connectMongoDB();
});
