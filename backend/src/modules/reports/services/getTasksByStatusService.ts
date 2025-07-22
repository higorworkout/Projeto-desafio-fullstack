import { AppDataSource } from '../../../database/data-source';
import { Task } from '../../../modules/tasks/entities/Task';

export class GetTasksByStatusService {
  async execute(): Promise<Array<{ status: string; count: number }>> {
    const taskRepository = AppDataSource.getRepository(Task);

    const result = await taskRepository
      .createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('task.status')
      .getRawMany();

    return result;
  }
}