
import { Request, Response } from 'express';
import { GetProfileService } from '../services/GetProfileService';
import { UpdateUserService } from '../services/UpdateUserService';

export class UsersController {


  async getProfile(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const service = new GetProfileService();
    const result = await service.execute(userId);
    return res.status(200).json(result);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
     const userId = req.user.id; // vindo do middleware de autenticação
    const { name, email, password } = req.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({ userId, name, email, password });

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso',
      user
    });
  }
}

