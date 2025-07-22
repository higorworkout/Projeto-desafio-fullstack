import { NotFoundError } from '../../../errors/NotFoundError';
import { AppDataSource } from '../../../database/data-source'; 
import { Task } from '../entities/Task';

export class DeleteTaskService {
  async execute(id: string): Promise<void> {
    const taskRepository = AppDataSource.getRepository(Task);

    const task = await taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    await taskRepository.remove(task);
  }
}