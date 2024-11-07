import express from "express";
import cors from "cors";
import taskRoutes from "./taskRoutes.js";

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gerenciamento-tarefas.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Configuração para parse de JSON
app.use(express.json());

// Definição das rotas
app.use("/api/tasks", taskRoutes);

// Middleware de logging para verificar as requisições
app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.path}`);
  next();
});

// Exporta como função para a Vercel
export default app;
