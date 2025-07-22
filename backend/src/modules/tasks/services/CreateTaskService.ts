import { AppDataSource } from '../../../database/data-source';
import { Task } from '../entities/Task';
import { User } from '../../users/entities/User';
import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
import { NotFoundError } from '../../../errors/NotFoundError';

export class CreateTaskService {
  async execute({ title, description, category, status, endDate, owner }: CreateTaskDTO): Promise<Task> {
    const userRepository = AppDataSource.getRepository(User);
    const taskRepository = AppDataSource.getRepository(Task);

    const user = await userRepository.findOne({ where: { id: owner } });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const task = taskRepository.create({
      title,
      description,
      category,
      status,
      endDate,
      owner: user,
      collaborators: [], 
    });

    await taskRepository.save(task);

    return task;
  }
}