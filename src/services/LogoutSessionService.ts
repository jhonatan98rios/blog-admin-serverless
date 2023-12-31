
import { MongoDBUserRepository } from "src/data/repositories/UserRepository";
import { MongoDBUserTokenRepository } from "src/data/repositories/UserTokenRepository";
import AppError from "src/utils/AppError";


export class LogoutSessionService {

    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
    ) {}

    async execute(username: string): Promise<void> {
        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`O usuário ${username} não foi encontrado`, 404)
        }

        await this.userTokenRepository.delete(username)
    }
}