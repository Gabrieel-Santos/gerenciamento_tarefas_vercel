import express from "express";
import cors from "cors";
import taskRoutes from "./taskRoutes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://gerenciamento-tarefas.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Configuração das rotas para tarefas
app.use("/api/tasks", taskRoutes);

// Exportação do `app`
export default app;
