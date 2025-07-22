import { AppDataSource } from '../../../database/data-source';
import { Task } from '../../../modules/tasks/entities/Task';
import { User } from '../../../modules/users/entities/User';

export class GetUserActivityService {
  async execute(): Promise<
    Array<{ userId: string; username: string; totalTasks: number; completedTasks: number }>
  > {
    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const result = await Promise.all(
      users.map(async (user) => {
        const totalTasks = await taskRepository.count({
          where: { assignedTo: { id: user.id } },
        });

        const completedTasks = await taskRepository.count({
          where: { assignedTo: { id: user.id }, status: 'completed' },
        });

        return {
          userId: user.id,
          username: user.username,
          totalTasks,
          completedTasks,
        };
      })
    );

    return result;
  }
}