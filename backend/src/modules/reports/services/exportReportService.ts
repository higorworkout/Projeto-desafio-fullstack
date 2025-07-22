import { Between } from 'typeorm';
import { AppDataSource } from '../../../database/data-source';
import { Task } from '../../../modules/tasks/entities/Task';

export class getTasksByDateRangeService {
  async execute(start: string, end: string): Promise<Task[]> {
    const taskRepository = AppDataSource.getRepository(Task);

    const tasks = await taskRepository.find({
      where: {
        createdAt: Between(new Date(start), new Date(end)),
      },
      relations: ['user'], // caso queira retornar também os dados do usuário
      order: {
        createdAt: 'ASC',
      },
    });

    return tasks;
  }
}