import { sign, Secret } from 'jsonwebtoken';
import { UserToken } from "opt/nodejs/domain/UserToken"
import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';
import { compareHash } from 'opt/nodejs/infra/utils/hash';
import { authConfig } from 'opt/nodejs/infra/utils/authConfig';
import AppError from "opt/nodejs/infra/utils/AppError"


type CreateSessionResponse = {
    user: string,
    token: string,
    role: string,
}

export class CreateSessionService {

    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
    ) {}

    async execute({ user, password }): Promise<CreateSessionResponse> {

        const findedUser = await this.userRepository.readOne(user)

        if (!findedUser) {
            throw new AppError('Usuário! ou senha incorretos', 401);
        }

        const passwordConfirmed = await compareHash(
            password, 
            findedUser.password
        )

        console.log(password)
        console.log(findedUser.password)

        if (!passwordConfirmed) {
            throw new AppError('Usuário ou senha! incorretos', 401);
        }

        const payload = {
            role: findedUser.role,
        }

        const options = {
            subject: user,
            expiresIn: authConfig.jwt.expiresIn
        }

        const token = sign(payload, authConfig.jwt.secret as Secret, options)
        
        const userToken = new UserToken({
            token, user
        })
        
        await this.userTokenRepository.create(userToken.props) 
       
        return {
            user: userToken.user,
            token: token,
            role: findedUser.role
        }
    }
}