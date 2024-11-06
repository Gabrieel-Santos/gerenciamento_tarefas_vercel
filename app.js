import express from "express";
import cors from "cors"; // Importa o pacote cors
import taskRoutes from "./server/routes/taskRoutes.js";

const app = express();

// Middleware para permitir requisições de JSON
app.use(express.json());

// Configuração do CORS para permitir requisições de outras origens
app.use(cors()); // Permite todas as origens

// Alternativamente, para permitir apenas o frontend em localhost:5173, use:
// app.use(cors({ origin: "http://localhost:5173" }));

// Rotas
app.use("/tasks", taskRoutes);

// Endpoint para verificar a saúde do servidor
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

export default app;
