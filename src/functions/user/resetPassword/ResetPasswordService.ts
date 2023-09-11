import { Secret, verify } from 'jsonwebtoken';
import { generateHash } from 'opt/nodejs/infra/utils/hash';
import { authConfig } from 'opt/nodejs/infra/utils/authConfig';

import AppError from "opt/nodejs/infra/utils/AppError"
import { Roles, User } from "opt/nodejs/domain/User"
import { AbstractUserRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserRepository';

interface ITokenPayload {
    iat: number
    exp: number
    mail: string
    password: string
}

interface IResetPasswordService {
    mail: string
    token: string
    password: string
    passwordConfirmation: string
}

type ResetPasswordResponse = {
    user: User
}

export class ResetPasswordService {

    constructor(
        private userRepository: AbstractUserRepository,
    ) {}

    async execute({ 
        mail, token, password, passwordConfirmation 
    }: IResetPasswordService): Promise<ResetPasswordResponse> {

        if (password != passwordConfirmation) {
            throw new AppError(`O campo confirmação de senha precisa ser igual ao campo senha`);
        }
        
        const findedUser = await this.userRepository.readOneByMail(mail)

        if (!findedUser) {
            throw new AppError(`O email ${mail} não foi encontrado`, 404)
        }

        try {
            const decodedToken = verify(token, authConfig.jwt.secret as Secret)
            const payload = decodedToken as ITokenPayload

            if (payload.mail != mail) {
                throw new AppError('Falha ao autenticar o usuário');
            }

            if (payload.password != findedUser.password) {
                throw new AppError('Falha ao autenticar o usuário');
            }

            const hashedPassword = await generateHash(password)

            const updatedUser = new User({
                user: findedUser.user,
                mail: findedUser.mail,
                password: hashedPassword,
                role: Roles.READ,
                consent: findedUser.consent,
                likedPosts: findedUser.likedPosts
            })

            this.userRepository.update(findedUser.user, updatedUser)

            return { user: updatedUser }

        } catch {
            throw new AppError('Falha ao autenticar o usuário');
        }
    }
}