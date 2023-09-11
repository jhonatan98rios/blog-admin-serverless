import { IUser } from "opt/nodejs/domain/User"
import AppError from "opt/nodejs/infra/utils/AppError"
import { AbstractUserRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserRepository';

type ReadOneUserResponse = {
    user: IUser | null
}

export class ReadOneUserService {

    constructor(private userRepository: AbstractUserRepository) {}

    async execute(user: string): Promise<ReadOneUserResponse> {

        const findedUser = await this.userRepository.readOne(user)

        if (!findedUser) {
            throw new AppError(`O usuário ${user} não foi encontrado`, 404)
        }

        return { user: findedUser }
    }
}