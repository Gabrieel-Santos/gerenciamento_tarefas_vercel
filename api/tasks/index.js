import express from "express";
import cors from "cors";
import taskRoutes from "./taskRoutes.js";
import { createServer } from "http";

// Criação da aplicação Express
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://gerenciamento-tarefas.vercel.app" }));

// Configuração das rotas para tarefas
app.use("/api/tasks", taskRoutes); // Ajuste o caminho aqui para corresponder ao endpoint Vercel

// Adaptação para Serverless
export default (req, res) => {
  const server = createServer(app);
  server.on("request", app);
  server.emit("request", req, res);
};
