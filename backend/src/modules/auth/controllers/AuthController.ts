
import { Request, Response } from 'express';
import { SignupService } from '../services/SignupService';
import { SigninService } from '../services/SigninService';
import { GetCurrentUserService } from '../services/GetCurrentUserService';
import { AuthenticatedRequest } from 'src/middlewares/isAuthenticated';
import { BadRequestError } from 'src/errors/BadRequestError';

export class AuthController {
  async signup(req: Request, res: Response): Promise<Response> {
    console.log('Rota /auth/signup foi chamada');
    try {
        const { name, email, password } = req.body;
        console.log(name)

        const service = new SignupService();

        const { user, token } = await service.execute({ name, email, password });

       
        return res.status(201).json({
            message: 'Usuário criado com sucesso',
            user,
            token,
        });

    } catch (error) {
        throw new BadRequestError('Erro ao cadastrar usuário' )
    }
  }

  async signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const service = new SigninService();

    const { user, token } = await service.execute({ email, password });

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      user,
      token,
    });
  }

  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?.id;
    const service = new GetCurrentUserService();
    const user = await service.execute(userId);
    return res.status(200).json(user);
  }
}

