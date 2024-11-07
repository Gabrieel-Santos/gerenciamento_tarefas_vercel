import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Task {
  id: number;
  nome: string;
  custo: number;
  dataLimite: string;
  ordemApresentacao: number;
}

Modal.setAppElement("#root");

const ItemType = { TASK: "task" };

interface TaskItemProps {
  task: Task;
  index: number;
  totalTasks: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  totalTasks,
  moveTask,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.TASK,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TASK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-4 border rounded-lg ${
        task.custo >= 1000 ? "bg-yellow-100" : "bg-white"
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <div>
        <h3 className="text-lg font-semibold text-[#283d50]">{task.nome}</h3>
        <p className="text-sm text-gray-600">R$ {task.custo.toFixed(2)}</p>
        <p className="text-sm text-gray-600">
          {new Date(task.dataLimite).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <button onClick={onMoveUp} disabled={index === 0}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className="text-[#007bff] cursor-pointer"
          />
        </button>
        <button onClick={onMoveDown} disabled={index === totalTasks - 1}>
          <FontAwesomeIcon
            icon={faArrowDown}
            className="text-[#007bff] cursor-pointer"
          />
        </button>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={onEdit}
          className="text-[#007bff] hover:text-blue-600 cursor-pointer"
          size="lg"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={onDelete}
          className="text-[#f02849] hover:text-red-600 cursor-pointer"
          size="lg"
        />
      </div>
    </div>
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
      setTasks(response.data);
    } catch (error) {
      setError("Erro ao carregar as tarefas.");
      console.error(error);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${taskToDelete.id}`);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskToDelete.id)
      );
      setShowDeleteModal(false);
      setTaskToDelete(null);
    } catch (error) {
      setError("Erro ao excluir tarefa.");
      console.error(error);
    }
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit({
      ...task,
      dataLimite: task.dataLimite.slice(0, 10),
    });
    setShowEditModal(true);
  };

  const confirmEditTask = async () => {
    if (!taskToEdit) return;

    try {
      const existingTask = tasks.find(
        (t) => t.nome === taskToEdit.nome && t.id !== taskToEdit.id
      );
      if (existingTask) {
        setError("Já existe uma tarefa com este nome.");
        return;
      }

      await axios.put(`${import.meta.env.VITE_API_URL}/${taskToEdit.id}`, {
        nome: taskToEdit.nome,
        custo: taskToEdit.custo,
        dataLimite: new Date(taskToEdit.dataLimite).toISOString(),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskToEdit.id ? taskToEdit : task))
      );
      setShowEditModal(false);
      setTaskToEdit(null);
    } catch (error) {
      setError("Erro ao atualizar tarefa.");
      console.error(error);
    }
  };

  const updateTaskOrder = async (updatedTasks: Task[]) => {
    console.log(
      "Enviando ordem atualizada:",
      updatedTasks.map((task) => ({ id: task.id }))
    );
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/update-order`,
        {
          orderedTasks: updatedTasks.map((task) => ({ id: task.id })),
        }
      );
      console.log("Resposta do backend:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta do backend:", error.response.data);
      } else {
        console.error("Erro desconhecido:", error);
      }
      setError("Erro ao atualizar a ordem das tarefas.");
    }
  };

  const moveTask = (from: number, to: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(from, 1);
    updatedTasks.splice(to, 0, movedTask);

    updatedTasks.forEach((task, index) => (task.ordemApresentacao = index + 1));
    setTasks(updatedTasks);

    updateTaskOrder(updatedTasks);
  };

  const moveTaskUp = (index: number) => {
    if (index === 0) return;
    moveTask(index, index - 1);
  };

  const moveTaskDown = (index: number) => {
    if (index === tasks.length - 1) return;
    moveTask(index, index + 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center items-center min-h-screen bg-[#ecf5ff]">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-[#283d50] mb-6 text-center">
            Minhas Tarefas
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4 font-bold">{error}</p>
          )}
          <div className="space-y-4">
            {tasks
              .sort((a, b) => a.ordemApresentacao - b.ordemApresentacao)
              .map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  totalTasks={tasks.length}
                  moveTask={moveTask}
                  onEdit={() => handleEditClick(task)}
                  onDelete={() => handleDeleteClick(task)}
                  onMoveUp={() => moveTaskUp(index)}
                  onMoveDown={() => moveTaskDown(index)}
                />
              ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link
              to="/add-task"
              className="bg-[#007bff] hover:bg-[#0056b3] text-white py-2 px-6 rounded-lg"
            >
              Incluir Tarefa
            </Link>
          </div>
        </div>

        <Modal
          isOpen={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
          contentLabel="Confirmar Exclusão"
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-lg font-bold text-[#283d50] mb-4">
            Confirmar Exclusão
          </h2>
          <p className="mb-4">
            Tem certeza de que deseja excluir a tarefa{" "}
            <strong>{taskToDelete?.nome}</strong>?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeleteTask}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
          contentLabel="Editar Tarefa"
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-lg font-bold text-[#283d50] mb-4">
            Editar Tarefa
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              value={taskToEdit?.nome || ""}
              onChange={(e) =>
                setTaskToEdit({ ...taskToEdit!, nome: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Custo
            </label>
            <div className="flex items-center">
              <span className="p-2 bg-gray-100 border border-r-0 rounded-l text-gray-500">
                R$
              </span>
              <input
                type="number"
                value={taskToEdit?.custo || 0}
                onChange={(e) =>
                  setTaskToEdit({
                    ...taskToEdit!,
                    custo: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-r"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Data Limite
            </label>
            <input
              type="date"
              value={taskToEdit ? taskToEdit.dataLimite : ""}
              onChange={(e) =>
                setTaskToEdit({ ...taskToEdit!, dataLimite: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={confirmEditTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default Tasks;
