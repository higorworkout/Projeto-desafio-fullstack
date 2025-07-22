import { UpdateUserDTO } from "../../users/dtos/UserDTO";
import { AppDataSource } from "../../../database/data-source";
import { User } from "../../users/entities/User";
import { BadRequestError } from 'error-utils';
import { hash } from 'bcrypt';

export class ReportsService {
  async execute({ userId, name, email, password }: UpdateUserDTO): Promise<Partial<User>> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestError('Usuário não encontrado');
    }

     if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
    }

    return user;
  }
}