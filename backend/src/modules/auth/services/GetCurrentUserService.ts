import { User } from "@modules/users/entities/User";
import { AppDataSource } from "../../../database/data-source";
import { NotFoundError } from "../../../errors/NotFoundError";



export class GetCurrentUserService {
    async execute(userId?: string) {
        if (!userId) {
            throw new Error('ID do usuário não fornecido');
        }

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { id: userId },
            select: ['id', 'name', 'email'],
        });

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return user;
    }
}