import { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import type { Task } from '../types/Task';
import TaskModal from '../components/TaskModal';
import { useAuth } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';
import TaskEditModal from '../components/TaskEditModal';
import { CollaboratorsModal } from '../components/CollaboratorsModal';


export default function TasksPage() {
  const { tasks, fetchTasks, addTask, setSelectedCategory, filteredTasks } = useTask();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const {  user, loading: authLoading } = useAuth();

   useEffect(() => {
    if (!authLoading && user) {
      fetchTasks(); // função no contexto para buscar do backend e atualizar o estado global
    }
  }, [authLoading, user, fetchTasks]);

  function handleCreate(task: Task) {
    addTask(task);  
    setShowModal(false);
  }

  function openEditModal(task: Task) {
    setSelectedTask(task);
    setShowEditModal(true);
  }


  return (
   <div className="min-h-screen bg-[#f5f5f5] p-4 relative">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#454f6a] mb-6">Minhas Tarefas</h1>
  
        <div className="relative group">
          <button className="p-2 rounded hover:bg-gray-100">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg hidden group-hover:block z-10">
            <button
              onClick={() => setSelectedCategory('Todas')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Todas
            </button>
            {[...new Set(tasks.map(task => task.category))].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div className="grid gap-4">
              <TaskItem 
                key={task.id} 
                task={task} 
                onEdit={() => openEditModal(task)}
                onOpenCollaborators={(taskId) => setSelectedTaskId(taskId)}
                />
            </div>
          ))}
        </div>


        <button onClick={() => setShowModal(true)} className="fixed bottom-6 right-6 bg-[#454f6a] text-white w-12 h-12 rounded-full text-2xl shadow">＋</button>
          <TaskModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onCreate={handleCreate}
          />
            <TaskEditModal
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              task={selectedTask}
            />

            {selectedTaskId && (
              <CollaboratorsModal
                taskId={selectedTaskId}
                onClose={() => setSelectedTaskId(null)}
            />
      )}
      
      </div>
    </div>
  );
}

