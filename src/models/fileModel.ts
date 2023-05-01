import { Schema, model } from "mongoose";
import { FileSchema } from "../types/types.models";

const fileSchema = new Schema<FileSchema>({
  filename: String,
  contentType: String,
  data: Buffer,
});

export default model<FileSchema>("File", fileSchema);
