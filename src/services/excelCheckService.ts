// src/services/excelService.ts
import { getTaskById, updateTask } from "./taskService";
import * as XLSX from "xlsx";
import type { TaskSchema } from "../types/types.models";

interface ErrorMessage {
  row: number;
  column: number;
  message: string;
}

export async function processExcelFile(
  taskId: string
): Promise<ErrorMessage[]> {
  // Leer el archivo de Excel y realizar la validación y procesamiento
  // Guardar los errores encontrados en el archivo en el campo "errors" de la tarea
  // Actualizar el estado de la tarea según sea necesario

  console.log("Processing Excel file...");

  const task: TaskSchema | null = await getTaskById(taskId);
  task?.updateOne({ status: "processing" });
  if (!task) {
    throw new Error("Task not found");
  }

  const workbook = XLSX.readFile("uploads/" + taskId + ".xlsx");
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);
  const errors = validateData(data);

  if (errors.length > 0) {
    console.log("Errors found:", errors);
    await updateTask(taskId, { status: "done", errors_task: errors });
    return errors;
  } else {
    // Procesa los datos del archivo Excel y realiza las acciones necesarias
    // Actualizar el estado de la tarea a 'done'
    await updateTask(taskId, { status: "done" });
    console.log("Excel file processed.");

    return [];
  }
}

function validateData(data: any[]): Array<ErrorMessage> {
  // Implementar la validación de datos del archivo Excel
  // Devuelve una lista de errores con la fila, columna y mensaje de error
  let errors: ErrorMessage[] = [];

  data.forEach((row, index) => {});

  return errors;
}
