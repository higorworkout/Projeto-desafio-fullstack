import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Collaborator {
  id: string;
  name: string;
  email: string;
}

interface CollaboratorsModalProps {
  taskId: string;
  onClose: () => void;
}

export const CollaboratorsModal: React.FC<CollaboratorsModalProps> = ({ taskId, onClose }) => {
  const [email, setEmail] = useState('');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchCollaborators() {
    try {
      const { data } = await axios.get(`/tasks/${taskId}`);
      setCollaborators(data.collaborators);
    } catch (err) {
      setError('Erro ao carregar colaboradores');
    }
  }

  async function handleAddCollaborator() {
    try {
      setLoading(true);
      await axios.post(`/tasks/${taskId}/collaborators`, {
        collaboratorEmail: email,
      });
      setEmail('');
      await fetchCollaborators(); // Atualiza lista
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao adicionar colaborador');
    } finally {
      setLoading(false);
    }
  }

    useEffect(() => {
        fetchCollaborators();
    }, [taskId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Colaboradores</h2>

        <ul className="mb-4">
          {collaborators.map((c) => (
            <li key={c.id} className="text-sm mb-1">
              {c.name} ({c.email})
            </li>
          ))}
        </ul>

        <input
          type="email"
          placeholder="E-mail do colaborador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <button
          onClick={handleAddCollaborator}
          disabled={loading || !email}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Adicionando...' : 'Adicionar colaborador'}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <button onClick={onClose} className="mt-4 text-gray-600 hover:underline text-sm">
          Fechar
        </button>
      </div>
    </div>
  );
};