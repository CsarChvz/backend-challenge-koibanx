// src/controllers/taskController.ts
import { Request, Response, NextFunction } from "express";
import Task from "../models/taskModel";

import { GridFsStorage } from "multer-gridfs-storage";

// Services
import { processExcelFile } from "../services/excelCheckService";
import { createTask, getTaskById } from "../services/taskService";

// Workers -- RabbitMQ
import { sendTaskToQueue } from "../workers/excelWorker";

// Multer - File Upload
import multer from "multer";
import { mongo } from "mongoose";
import path from "path";

export async function uploadExcel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Implementar función para manejar la carga de archivos de Excel
  const task = await createTask();
  const taskId = task.id;
  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname);
      const filename = `${taskId}${extension}`;
      callback(null, filename);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new Error("Please upload an Excel file"));
      }
      callback(null, true);
    },
  }).single("file");

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File uploaded successfully.");
  });
  sendTaskToQueue(taskId);

  res.send("---Upload Excel---" + taskId);
}

export async function getTaskStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Implementar función para obtener el estado de una tarea
  const taskId = req.params.taskId;
  const task = await getTaskById(taskId);
  res.send(task);
}

export async function getTaskErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Implementar función para obtener los errores de una tarea
  const taskId = req.params.taskId;
  const task = await getTaskById(taskId);
  res.send(task);
}

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Implementar función para obtener las tareas de forma paginada
  console.log("Get Tasks");
  res.send("Get Tasks");

  next();
}
