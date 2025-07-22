import { AppDataSource } from '../../../database/data-source'; 
import { Task } from '../entities/Task';
import { User } from '../../users/entities/User';
import { NotFoundError } from '../../../errors/NotFoundError';
import { BadRequestError } from '../../../errors/BadRequestError';

export class AddCollaboratorService {
  async execute(taskId: string, collaboratorEmail: string): Promise<{ message: string }> {
    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);

    // Busca a tarefa pelo ID
    const task = await taskRepository.findOne({
      where: { id: taskId },
      relations: ['collaborators'],
    });
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    // Busca o usuário colaborador pelo email
    const collaborator = await userRepository.findOne({
      where: { email: collaboratorEmail },
    });
    if (!collaborator) {
      throw new NotFoundError('Collaborator not found');
    }

    // Verifica se já é colaborador
    const isAlreadyCollaborator = task.collaborators.some(
      (user) => user.id === collaborator.id
    );
    if (isAlreadyCollaborator) {
      throw new BadRequestError('User is already a collaborator of this task');
    }

    // Adiciona o colaborador na lista
    task.collaborators.push(collaborator);

    // Salva a tarefa atualizada
    await taskRepository.save(task);

    return { message: `Collaborator ${collaboratorEmail} added to task ${taskId}` };
  }
}