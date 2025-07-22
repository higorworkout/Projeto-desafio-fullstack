import { NotFoundError } from '../../../errors/NotFoundError';
import { AppDataSource } from '../../../database/data-source';
import { Task } from '../entities/Task';

export class FindTaskByIdService {
  async execute(id: string): Promise<Task | null> {
    const taskRepository = AppDataSource.getRepository(Task);

    // Buscar a tarefa pelo id incluindo owner e colaboradores
    const task = await taskRepository.findOne({
      where: { id },
      relations: ['owner', 'collaborators'],
    });

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task;
  }
}