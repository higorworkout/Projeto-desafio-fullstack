import { AppDataSource } from "../../../database/data-source";
import { User } from "../entities/User";
import { BadRequestError } from 'error-utils';

export class GetProfileService {
  async execute(userId: string): Promise<Partial<User>> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }
    
     return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}