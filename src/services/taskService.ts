// src/services/taskService.ts
import Task from "../models/taskModel";

import type { TaskSchema } from "../types/types.models";

export async function createTask(): Promise<TaskSchema> {
  const task = new Task();
  return await task.save();
}

export async function updateTask(taskId: string, update: Partial<TaskSchema>) {
  return await Task.findByIdAndUpdate(taskId, update, { new: true });
}

export async function getTaskById(taskId: string) {
  return await Task.findById(taskId);
}
