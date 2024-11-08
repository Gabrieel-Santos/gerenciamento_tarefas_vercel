import express from "express";
import {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
  updateTaskOrder,
} from "./taskController.js";

const router = express.Router();

// Rota para atualizar a ordem das tarefas
router.put("/update-order", updateTaskOrder);

// Rota para criar uma nova tarefa
router.post("/", createTask);

// Rota para listar todas as tarefas
router.get("/", listTasks);

// Rota para atualizar uma tarefa específica (editar)
router.put("/:id", updateTask);

// Rota para excluir uma tarefa específica
router.delete("/:id", deleteTask);

export default router;
