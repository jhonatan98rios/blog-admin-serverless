import { IUser } from "opt/nodejs/domain/User"
import { AbstractUserRepository } from "opt/nodejs/infra/data/repositories/abstractDB/UserRepository";
import AppError from "opt/nodejs/infra/utils/AppError"

type ReadOneUserResponse = {
    users: IUser[] | null
}

export class ReadAllUsersService {

    constructor(private userRepository: AbstractUserRepository) {}

    async execute(): Promise<ReadOneUserResponse> {
        const users = await this.userRepository.readAll()
        if (!users) {
            throw new AppError('Nenhum usuário encontrado', 404)
        }
        return { users: users }
    }
}