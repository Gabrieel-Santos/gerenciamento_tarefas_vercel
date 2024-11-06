import express from "express";
import cors from "cors";
import taskRoutes from "./taskRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://gerenciamento-tarefas.vercel.app" }));

// Use as rotas para tarefas
app.use("/tasks", taskRoutes);

export default (req, res) => {
  app(req, res); // Adapta o Express para o formato de função Serverless
};
