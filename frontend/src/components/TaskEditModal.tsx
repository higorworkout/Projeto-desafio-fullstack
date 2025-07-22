import { useState, useEffect } from 'react';
import api from '../services/api';
import { useTask } from '../hooks/useTask';
import type { Task } from '../types/Task';

interface TaskEditModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function TaskEditModal({ open, onClose, task }: TaskEditModalProps) {
  const { fetchTasks, removeTask } = useTask();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    endDate: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || '',
        endDate: task.endDate ? task.endDate.split('T')[0] : '',
        status: task.status || 'pending',
      });
    }
  }, [task]);

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    setLoading(true);
    setError('');
    try {
      await api.put(`/tasks/${task?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      await fetchTasks();
      onClose();
    } catch {
      setError('Erro ao atualizar a tarefa');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!task) return;
    if (!window.confirm('Deseja realmente deletar essa tarefa?')) return;

    setLoading(true);
    setError('');
    try {
      await removeTask(task.id);
      onClose();
    } catch {
      setError('Erro ao deletar a tarefa');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(69,79,106,0.4)] backdrop-blur-sm z-50 px-4">
      <div className="bg-[#454f6a] rounded-2xl shadow-lg p-6 w-full max-w-xl sm:max-w-md relative text-white">
        {/* Botão X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl hover:text-gray-200"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Editar Tarefa</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-5"
        >
          <div>
            <input
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white focus:outline-none focus:border-blue-300 placeholder-white"
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Descrição"
              value={formData.description}
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
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-white text-white focus:outline-none focus:border-blue-300"
            />
          </div>

          <div>
            <input
              name="category"
              placeholder="Categoria"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white focus:outline-none focus:border-blue-300 placeholder-white"
            />
          </div>

          <div>
            <select
              name="status"
              value={formData.status}
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
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? 'Deletando...' : 'Deletar'}
            </button>

            <div>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 rounded bg-white text-[#454f6a] hover:bg-gray-200 mr-2"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}