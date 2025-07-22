import { Request, Response } from 'express';
import { CreateTaskService } from '../services/CreateTaskService';
import { ListTasksService } from '../services/ListTasksService';
import { FindTaskByIdService } from '../services/FindTaskByIdService';
import { UpdateTaskService } from '../services/UpdateTaskService';
import { DeleteTaskService } from '../services/DeleteTaskService';
import { AddCollaboratorService } from '../services/AddCollaboratorService';
import { RemoveCollaboratorService } from '../services/RemoveCollaboratorService';

export class TaskController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description, category, status, endDate } = req.body;
    const owner = req.user.id;

    const service = new CreateTaskService();
    const result = await service.execute({ title, description, category, status, owner, endDate });
     return res.status(200).json({
      message: 'Tarefa criada com sucesso',
      task: result,
    });
  }

  async listUserTasks(req: Request, res: Response): Promise<Response> {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const service = new ListTasksService();
    const result = await service.execute(userId);
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new FindTaskByIdService();
    const result = await service.execute(id);
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { title, description, category, status, endDate } = req.body;
    const { id } = req.params;
    const service = new UpdateTaskService();
    const result = await service.execute(id, {
      title,
      description,
      category,
      status,
      endDate,
    });
     return res.status(200).json({
      message: 'Tarefa atualizada com sucesso',
      task: result,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new DeleteTaskService();
    await service.execute(id);
    return res.status(204).send();
  }

  async addCollaborator(req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id;
    const { email } = req.body;
    
    const service = new AddCollaboratorService();
    try {
      const task = await service.execute( taskId, email );
      return res.status(200).json({task});
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  
  }

  async removeCollaborator(req: Request, res: Response): Promise<Response> {
    const { id: taskId } = req.params;
    const { email } = req.body;

    const service = new RemoveCollaboratorService();

    try {
      const result = await service.execute( taskId, email );

      return res.status(200).json({
        message: 'Colaborador removido com sucesso',
        task: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}