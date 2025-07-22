import { AppDataSource } from '../../../database/data-source';
import { Task } from '../entities/Task';

export class ListTasksService {
  async execute(userId: string) {
    const taskRepository = AppDataSource.getRepository(Task);

    // Busca todas as tarefas
     const tasks = await taskRepository.find({
      where: {
        owner: {
          id: userId, 
        },
      },
      relations: ['owner', 'collaborators'], 
      order: { title: 'ASC' },
    });

    return tasks;
  }
}