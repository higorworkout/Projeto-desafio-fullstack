import { useState } from 'react';
import type { Task } from '../types/Task';
import api from '../services/api';
import { useTask } from '../hooks/useTask';

interface TaskModalProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
}

export default function TaskForm({ onSubmit ,onClose }: TaskModalProps) {
  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    endDate: '',
    category: '',
    status: 'pending'
  });
  const { fetchTasks } = useTask();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
     await api.post('http://localhost:3000/task', form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    await fetchTasks();
    onSubmit(form)
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(69,79,106,0.4)] backdrop-blur-sm z-50 px-4">
    <div className="bg-[#454f6a] rounded-2xl shadow-lg p-6 w-full max-w-xl sm:max-w-md relative text-white">
    {/* Botão X */}
    <button
      onClick={onClose}
      className="absolute top-3 right-4 text-white text-xl hover:text-gray-200"
    >
      ✕
    </button>

    <h2 className="text-2xl font-semibold text-center mb-6">Criar Tarefa</h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          name="title"
          placeholder="Título"
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white focus:outline-none focus:border-blue-300 placeholder-white"
        />
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Descrição"
          onChange={handleChange}
          rows={3}
          className="w-full bg-transparent border-b border-white resize-none focus:outline-none focus:border-blue-300 placeholder-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Data de entrega</label>
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white text-white focus:outline-none focus:border-blue-300"
        />
      </div>

      <div>
        <input
          name="category"
          placeholder="Categoria"
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white focus:outline-none focus:border-blue-300 placeholder-white"
        />
      </div>

      <div>
        <select
          name="status"
          onChange={handleChange}
          className="w-full bg-transparent border-b border-white text-white focus:outline-none focus:border-blue-300"
        >
          <option className="text-black" value="pending">Pendente</option>
          <option className="text-black" value="in-progress">Em andamento</option>
          <option className="text-black" value="done">Concluída</option>
        </select>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-white text-[#454f6a] hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Criar Tarefa
                </button>
                </div>
            </form>
        </div>
    </div>

  );
}