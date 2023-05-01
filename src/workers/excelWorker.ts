// src/workers/excelWorker.ts
import amqp from "amqplib/callback_api";
import { processExcelFile } from "../services/excelCheckService";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

export async function sendTaskToQueue(taskId: string) {
  amqp.connect(RABBITMQ_URL, (error, connection) => {
    if (error) {
      throw error;
    }

    connection.createChannel((err, channel) => {
      if (err) {
        throw err;
      }

      const queue = "excel_processing";

      channel.assertQueue(queue, {
        durable: true,
      });

      console.log("Worker is waiting for messages in the queue:", queue);

      channel.sendToQueue(queue, Buffer.from(taskId), {
        persistent: true,
      });

      console.log("Sent message:", taskId);

      channel.consume(
        queue,
        async (msg) => {
          if (msg) {
            console.log("Received message:", msg.content.toString());

            const taskId = msg.content.toString();

            await processExcelFile(taskId);

            channel.ack(msg);
          }
        },
        {
          noAck: false,
        }
      );
    });
  });
}
