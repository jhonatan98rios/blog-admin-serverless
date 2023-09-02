import { IUser } from "src/domain/User"
import { MongoDBUserRepository } from "src/data/repositories/UserRepository"
import AppError from "src/utils/AppError"

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