import pkg from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const express = pkg;
const app = express();

// db server connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.weigt9e.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log("Database Connected");
}

//bodyParser
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("default"));
app.use(express.static("public"));

// Use routes
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
