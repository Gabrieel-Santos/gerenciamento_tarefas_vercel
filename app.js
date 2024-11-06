import express from "express";
import cors from "cors"; // Importa o pacote cors
import taskRoutes from "./server/routes/taskRoutes.js";

const app = express();

// Middleware para permitir requisições de JSON
app.use(express.json());

// Configuração do CORS para permitir requisições de outras origens
app.use(cors({ origin: "https://gerenciamento-tarefas.vercel.app" }));

// Rotas
app.use("/tasks", taskRoutes);

// Endpoint para verificar a saúde do servidor
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

export default app;
