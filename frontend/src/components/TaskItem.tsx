import { useTask } from '../hooks/useTask';
import type { Task } from '../types/Task';

export default function TaskItem(
  { task, onEdit,  onOpenCollaborators }: { task: Task, onEdit: () => void,   onOpenCollaborators: (taskId: string) => void}) {
  const { removeTask } = useTask();


  return (
    <div
    onClick={onEdit}
    className="bg-white shadow-md rounded p-4 border-l-4 border-[#454f6a] flex justify-between items-start cursor-pointer hover:bg-gray-100 transition"
    >
        <div>
          <h3 className="text-lg font-bold text-[#454f6a]">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="text-xs text-gray-500 mt-2">
            Finaliza em: {new Date(task.endDate).toLocaleDateString()}
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation(); 
            onEdit();
          }}
          className="ml-4 p-1 rounded bg-[#454f6a] text-white text-xs flex items-center justify-center w-6 h-6 hover:bg-blue-600 transition cursor-pointer select-none"
          title="Editar tarefa"
        >
          🖉
      </div>
      <button
        onClick={() => onOpenCollaborators(task.id)}
        className="mt-2 text-sm text-blue-500 hover:underline"
      >
        🤝 Gerenciar Colaboradores
      </button>
    </div>
  );
}