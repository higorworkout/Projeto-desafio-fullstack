import { AppDataSource } from '../../../database/data-source';
import { Task } from '../entities/Task';
import { User } from '../../users/entities/User';
import { NotFoundError } from '../../../errors/NotFoundError';
import { BadRequestError } from '../../../errors/BadRequestError';

export class RemoveCollaboratorService {
  async execute(taskId: string, collaboratorEmail: string) {
    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);

    // Busca a tarefa com os colaboradores
    const task = await taskRepository.findOne({
      where: { id: taskId },
      relations: ['collaborators'],
    });

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    const collaborator = await userRepository.findOne({
      where: { email: collaboratorEmail },
    });

    if (!collaborator) {
      throw new NotFoundError('Collaborator not found');
    }

    // Verifica se o colaborador faz parte da tarefa
    const isCollaborator = task.collaborators.some(
      (user) => user.email === collaboratorEmail
    );

    if (!isCollaborator) {
      throw new BadRequestError('User is not a collaborator of this task');
    }

    // Remove o colaborador da lista
    task.collaborators = task.collaborators.filter(
      (user) => user.email !== collaboratorEmail
    );

    // Salva a tarefa atualizada
    await taskRepository.save(task);

    return {
      message: `Collaborator ${collaboratorEmail} removed from task ${taskId}`,
    };
  }
}