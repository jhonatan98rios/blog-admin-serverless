import { addHours, isAfter } from "date-fns";
import AppError from "opt/nodejs/infra/utils/AppError"
import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';

type CheckInSessionResponse = {
    user: string,
    token: string,
    role: string
}

export class CheckInSessionService {

    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
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