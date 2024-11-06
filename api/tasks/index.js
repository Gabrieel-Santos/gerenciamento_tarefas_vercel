import express from "express";
import cors from "cors";
import taskRoutes from "./taskRoutes.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Configuração das rotas para tarefas
app.use("/api/tasks", taskRoutes);
app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.path}`);
  next();
});

// Exporta como função para a Vercel
export default app;
