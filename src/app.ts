import dotenv from "dotenv";
import express from "express";
import mongoose, { Schema } from "mongoose";

// Types
import type { Express } from "express";

// Routes
import { taskRoutes } from "./routes/taskRoutes";
import { processExcelFile } from "./services/excelCheckService";
// Configurations
import amqp from "amqplib/callback_api";
import { consumeRabbit } from "./utils/consumeRabbit";

dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri: string = process.env.MONGO_URI || "";
const port: number = Number(process.env.PORT) || 3000;
mongoose.connect(
  "mongodb+srv://cesarchavez8728:@backendchallengekoibanx.3nkilsm.mongodb.net/backend_challenge_koibanx?retryWrites=true&w=majority"
);

app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  consumeRabbit();
  // amqp.connect(RABBITMQ_URL, (error, connection) => {
  //   if (error) {
  //     throw error;
  //   }

  //   connection.createChannel((err, channel) => {
  //     if (err) {
  //       throw err;
  //     }

  //     const queue = "excel_processing";

  //     channel.assertQueue(queue, {
  //       durable: true,
  //     });

  //     console.log("Worker is waiting for messages in the queue:", queue);

  //     channel.consume(
  //       queue,
  //       async (msg) => {
  //         if (msg) {
  //           console.log("Received message:", msg.content.toString());
  //           console.log(processExcelFile(msg.content.toString()));

  //           const taskId = msg.content.toString();
  //           let error = await processExcelFile(taskId);
  //           channel.ack(msg);
  //         }
  //       },
  //       {
  //         noAck: false,
  //       }
  //     );
  //   });
  // });
});
