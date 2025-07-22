import { AppDataSource } from '../../../database/data-source';
import { User } from '../../../modules/users/entities/User';
import { Task } from '../../../modules/tasks/entities/Task';

export class GetCompletedTasksByUserService {
  async execute(): Promise<Array<{ userId: string; username: string; completedTasks: number }>> {
    const taskRepository = AppDataSource.getRepository(Task);

    const completedTasks = await taskRepository
      .createQueryBuilder('task')
      .select('task.userId', 'userId')
      .addSelect('user.username', 'username')
      .addSelect('COUNT(*)', 'completedTasks')
      .innerJoin(User, 'user', 'user.id = task.userId')
      .where('task.completed = :completed', { completed: true })
      .groupBy('task.userId, user.username')
      .getRawMany();

    return completedTasks;
  }
}