import { AppDataSource } from '../../../database/data-source';
import { Task } from '../../../modules/tasks/entities/Task';

export class GetTaskSummaryService {
  async execute(): Promise<Record<string, number>> {
    const taskRepository = AppDataSource.getRepository(Task);

    const statuses = ['pending', 'in_progress', 'completed', 'canceled']; // Adapte conforme seu enum ou model
    const summary: Record<string, number> = {};

    for (const status of statuses) {
      const count = await taskRepository.count({ where: { status } });
      summary[status] = count;
    }

    return summary;
  }
}