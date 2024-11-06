import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TaskInput {
  nome: string;
  custo: number;
  dataLimite: string;
}

const AddTask: React.FC = () => {
  const [nome, setNome] = useState<TaskInput["nome"]>("");
  const [custo, setCusto] = useState<TaskInput["custo"]>(0);
  const [dataLimite, setDataLimite] = useState<TaskInput["dataLimite"]>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Função para enviar o formulário de adição de tarefa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Requisição para adicionar uma nova tarefa
      const response = await axios.post("http://localhost:5000/tasks", {
        nome,
        custo,
        dataLimite,
      });

      if (response.status === 201) {
        // Limpa os campos do formulário após o sucesso
        setNome("");
        setCusto(0);
        setDataLimite("");
        navigate("/tasks");
      }
    } catch (error: unknown) {
      // Verifica se o erro vem da API do Axios
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message ||
            "Erro ao adicionar tarefa. Verifique se o nome é único."
        );
      } else {
        setError("Erro inesperado. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ecf5ff]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#283d50]">
          Adicionar Tarefa
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="nome" className="text-gray-500 text-sm font-medium">
              Nome da Tarefa
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-[#007bff] hover:border-[#007bff]"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="custo"
              className="text-gray-500 text-sm font-medium"
            >
              Custo
            </label>
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#007bff]">
              <span className="text-gray-500 p-3">R$</span>
              <input
                type="number"
                id="custo"
                value={custo}
                onChange={(e) => setCusto(parseFloat(e.target.value))}
                required
                step="0.01" // Permite casas decimais
                min="0" // Evita valores negativos
                className="w-full p-3 focus:outline-none placeholder-[#a0aec0]"
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="dataLimite"
              className="text-gray-500 text-sm font-medium"
            >
              Data Limite
            </label>
            <input
              type="date"
              id="dataLimite"
              value={dataLimite}
              onChange={(e) => setDataLimite(e.target.value)}
              required
              className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-[#007bff] hover:border-[#007bff]"
            />
          </div>

          {/* Exibe mensagem de erro, se houver */}
          {error && (
            <p className="text-red-500 text-center mb-4 font-bold">{error}</p>
          )}
          <button
            type="submit"
            className="w-full p-3 rounded-lg text-white transition-colors bg-[#007bff] hover:bg-[#0056b3]"
          >
            ADICIONAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
