import { MongoDBUserRepository } from "opt/nodejs/infra/data/repositories/UserRepository"
import { IUser } from "opt/nodejs/domain/User"
import AppError from "opt/nodejs/infra/utils/AppError"

type ReadOneUserResponse = {
    user: IUser | null
}

export class ReadOneUserService {

    constructor(private userRepository: MongoDBUserRepository) {}

    async execute(user: string): Promise<ReadOneUserResponse> {

        const findedUser = await this.userRepository.readOne(user)

        if (!findedUser) {
            throw new AppError(`O usuário ${user} não foi encontrado`, 404)
        }

        return { user: findedUser }
    }
}