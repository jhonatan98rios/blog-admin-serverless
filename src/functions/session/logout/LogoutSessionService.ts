import { AbstractUserRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserRepository';
import { AbstractUserTokenRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserTokenRepository';
import AppError from "opt/nodejs/infra/utils/AppError"


export class LogoutSessionService {

    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute(username: string): Promise<void> {
        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`O usuário ${username} não foi encontrado`, 404)
        }

        await this.userTokenRepository.delete(username)
    }
}