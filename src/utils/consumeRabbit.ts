// src/workers/excelWorker.ts
import amqp from "amqplib/callback_api";
import { processExcelFile } from "../services/excelCheckService";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

export async function consumeRabbit() {
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
      channel.prefetch(1);
      console.log("Worker is waiting for messages in the queue:", queue);
      channel.consume(
        queue,
        async (msg) => {
          if (msg) {
            const taskId = msg.content.toString();

            let errors = await processExcelFile(taskId);
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
