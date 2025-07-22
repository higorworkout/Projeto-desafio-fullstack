import { AppDataSource } from "../../../database/data-source";
import { sign } from 'jsonwebtoken';
import { User } from "../../users/entities/User";
import { LoginUserDTO } from "../dtos/AuthDTO";
import { compare } from 'bcryptjs';
import { BadRequestError } from "../../../errors/BadRequestError";

export class SigninService {
  async execute({ email, password }: LoginUserDTO): Promise<{ user: Partial<User>; token: string }> {
    const userRepository = AppDataSource.getRepository(User);

    
    const user = await userRepository.findOne({ where: { email } });
    console.log(user)
    
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await compare( password, user.password);

    console.log(passwordsMatch)

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    };
    console.log( "Jwt - " + process.env.JWT_SECRET!)
      const token = sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET!, 
          {
            expiresIn: '7d',
          }
        );


    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}