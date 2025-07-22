import { NotFoundError } from '../../../errors/NotFoundError';
import { AppDataSource } from '../../../database/data-source'; // ajuste o caminho
import { UpdateTaskDTO } from '../dtos/CreateTaskDTO';
import { Task } from '../entities/Task';



export class UpdateTaskService {
  async execute(id: string, data: UpdateTaskDTO): Promise<Task> {
    const taskRepository = AppDataSource.getRepository(Task);

    const task = await taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    // Atualiza apenas os campos enviados
    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.category !== undefined) task.category = data.category;
    if (data.endDate !== undefined) task.endDate = data.endDate;
    if (data.status !== undefined) {
      task.status = data.status;
    }

    await taskRepository.save(task);

    return task;
  }
}
