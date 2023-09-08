import { IUser } from "opt/nodejs/domain/User"
import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import AppError from "opt/nodejs/infra/utils/AppError"

type ReadOneUserResponse = {
    users: IUser[] | null
}

export class ReadAllUsersService {

    constructor(private userRepository: MongoDBUserRepository) {}

    async execute(): Promise<ReadOneUserResponse> {
        const users = await this.userRepository.readAll()
        if (!users) {
            throw new AppError('Nenhum usuário encontrado', 404)
        }
        return { users: users }
    }
}