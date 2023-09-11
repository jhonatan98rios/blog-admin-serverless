import { addHours, isAfter } from "date-fns";
import AppError from "opt/nodejs/infra/utils/AppError"
import { AbstractUserRepository } from "opt/nodejs/infra/data/repositories/abstractDB/UserRepository";
import { AbstractUserTokenRepository } from "opt/nodejs/infra/data/repositories/abstractDB/UserTokenRepository";

type CheckInSessionResponse = {
    user: string,
    token: string,
    role: string
}

export class CheckInSessionService {

    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute(token: string): Promise<CheckInSessionResponse> {

        const userToken = await this.userTokenRepository.findByToken(token)

        if (!userToken) {
            throw new AppError('Falha ao autenticar o usuário');
        }

        const user = await this.userRepository.readOne(userToken.user)

        if (!user) {
            throw new AppError('Falha ao autenticar o usuário');
        }

        const compare = addHours(userToken.created_at, 2)

        if (isAfter(Date.now(), compare)) {
            throw new AppError('Falha ao autenticar o usuário');
        }

        return {
            user: userToken.user,
            token: userToken.token,
            role: user.role
        }
    }
}