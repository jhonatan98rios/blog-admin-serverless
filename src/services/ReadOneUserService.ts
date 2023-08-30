import { MongoDBUserRepository } from "src/data/repositories/UserRepository"
import { IUser } from "src/domain/User"
import AppError from "src/utils/AppError"

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