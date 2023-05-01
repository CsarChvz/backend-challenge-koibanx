import express from "express";
import type { Router, Response, Request } from "express";

const taskRoutes: Router = express.Router();
import {
  uploadExcel,
  getTasks,
  getTaskStatus,
  getTaskErrors,
} from "../controllers/taskController";

taskRoutes.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World");
});
taskRoutes.get("/", getTasks);
taskRoutes.post("/upload", uploadExcel);
taskRoutes.get("/:taskId/status", getTaskStatus);
taskRoutes.get("/:taskId/errors", getTaskErrors);

export { taskRoutes };
