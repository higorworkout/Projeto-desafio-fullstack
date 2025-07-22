import { AppDataSource } from "../../../database/data-source";
import { CreateUserDTO } from "../dtos/AuthDTO";
import { User } from "../../users/entities/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../../../errors/BadRequestError";


export class SignupService {
  async execute({ name, email, password }: CreateUserDTO): Promise<{ user: Partial<User>, token: string }> {
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    console.log('Verificando se o usuário já existe:', userExists);

    if (userExists) {
       throw new BadRequestError('Email is in use')
    }
    console.log(password)

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

     await userRepository.save(user);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7h',
    });

    return {
          user: {
          id: user.id,
          name: user.name,
          email: user.email,
        } ,
        token,
     }
  }
}