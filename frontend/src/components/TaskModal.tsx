import TaskForm from './TaskForm';
import type { Task } from '../types/Task';

export default function TaskModal({
  open,
  onClose,
  onCreate
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#000000]/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600">✕</button>
        <h2 className="text-xl font-bold text-[#454f6a] mb-4">Nova Tarefa</h2>
        <TaskForm onSubmit={onCreate} onClose={onClose} />
      </div>
    </div>
  );
}