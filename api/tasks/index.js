import express from "express";
import cors from "cors";
import taskRoutes from "./taskRoutes.js";

// Criação da aplicação Express
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://gerenciamento-tarefas.vercel.app" }));

// Configuração das rotas para tarefas
app.use("/api/tasks", taskRoutes); // Ajuste o caminho para o endpoint desejado

// Exportação da função para o ambiente serverless
export default async (req, res) => {
  // Passa a requisição e a resposta para o app Express
  await app(req, res);
};
