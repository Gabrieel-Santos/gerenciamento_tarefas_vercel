import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Lista de Tarefas
export const listTasks = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { ordemApresentacao: "asc" },
    });
    res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

// Incluir uma nova tarefa
export const createTask = async (req, res) => {
  const { nome, custo, dataLimite } = req.body;

  // Verifica se todos os campos obrigatórios foram informados
  if (!nome || custo === undefined || !dataLimite) {
    return res
      .status(400)
      .json({ message: "Nome, custo e data limite são obrigatórios" });
  }

  try {
    // Verifica se o nome já existe
    const existingTask = await prisma.tarefa.findUnique({ where: { nome } });
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Já existe uma tarefa com este nome" });
    }

    // Define a ordem de apresentação para a nova tarefa
    const lastTask = await prisma.tarefa.findFirst({
      orderBy: { ordemApresentacao: "desc" },
    });
    const ordemApresentacao = lastTask ? lastTask.ordemApresentacao + 1 : 1;

    // Cria a nova tarefa
    const novaTarefa = await prisma.tarefa.create({
      data: {
        nome,
        custo,
        dataLimite: new Date(dataLimite),
        ordemApresentacao,
      },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
};

// Editar uma tarefa
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { nome, custo, dataLimite } = req.body;

  try {
    // Verifica se o `id` e `nome` estão definidos
    if (!id || !nome) {
      return res
        .status(400)
        .json({ message: "ID e nome são obrigatórios para atualização." });
    }

    // Verifica se o novo nome já existe em outra tarefa
    const existingTask = await prisma.tarefa.findFirst({
      where: {
        nome,
        id: { not: parseInt(id) },
      },
    });

    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Já existe uma tarefa com este nome" });
    }

    // Atualiza a tarefa
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        custo,
        dataLimite: new Date(dataLimite),
      },
    });

    res.json(tarefaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: "Erro ao atualizar tarefa" });
  }
};

// Excluir uma tarefa
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica se a tarefa existe antes de excluí-la
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) },
    });
    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Exclui a tarefa
    await prisma.tarefa.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // Status 204 sem conteúdo
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ message: "Erro ao excluir tarefa" });
  }
};

// Atualizar a ordem de apresentação das tarefas
export const updateTaskOrder = async (req, res) => {
  const { orderedTasks } = req.body;

  if (!orderedTasks || !Array.isArray(orderedTasks)) {
    return res
      .status(400)
      .json({
        message:
          "Formato inválido para orderedTasks. Deve ser um array de objetos com id.",
      });
  }

  try {
    // Atualiza cada tarefa com a nova ordem de apresentação
    const updatePromises = orderedTasks.map((task, index) => {
      return prisma.tarefa.update({
        where: { id: task.id },
        data: { ordemApresentacao: index + 1 },
      });
    });

    await Promise.all(updatePromises);

    res
      .status(200)
      .json({ message: "Ordem das tarefas atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar ordem das tarefas:", error);
    res.status(500).json({ message: "Erro ao atualizar ordem das tarefas" });
  }
};
