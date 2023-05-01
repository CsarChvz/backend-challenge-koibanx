import type { Document } from "mongoose";
export interface TaskSchema extends Document {
  status: string;
  errors_task: Array<{ row: number; column: number; message: string }>;
}

export interface FileSchema extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
}
