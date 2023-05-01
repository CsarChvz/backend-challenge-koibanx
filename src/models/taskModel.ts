import { Schema, model, Document, Model } from "mongoose";
import { TaskSchema } from "../types/types.models";

const taskSchema = new Schema<TaskSchema>({
  status: {
    type: String,
    enum: ["pending", "processing", "done"],
    default: "pending",
  },
  errors_task: [
    {
      row: { type: Number },
      column: { type: Number },
      message: { type: String },
    },
  ],
});

export default model<TaskSchema>("Task", taskSchema);
