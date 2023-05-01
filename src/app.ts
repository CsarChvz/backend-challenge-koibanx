import dotenv from "dotenv";
import express from "express";
import mongoose, { Schema } from "mongoose";

// Types
import type { Express } from "express";

// Routes
import { taskRoutes } from "./routes/taskRoutes";
// Configurations

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri: string = process.env.MONGO_URI || "";
const port: number = Number(process.env.PORT) || 3000;
mongoose.connect(
  "mongodb+srv://cesarchavez8728:pandita9@backendchallengekoibanx.3nkilsm.mongodb.net/backend_challenge_koibanx?retryWrites=true&w=majority"
);

app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
