import { Secret, sign } from 'jsonwebtoken';
import { authConfig } from 'opt/nodejs/infra/utils/authConfig';
import AppError from "opt/nodejs/infra/utils/AppError"
import SESMailProvider from 'opt/nodejs/infra/providers/SESMailProvider';
import { AbstractUserRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserRepository';

export class ForgotPasswordService {

    constructor(
        private userRepository: AbstractUserRepository,
        private mailProvider: SESMailProvider
    ) {}

    async execute(mail: string): Promise<string> {
        
        const findedUser = await this.userRepository.readOneByMail(mail)

        if (!findedUser) {
            throw new AppError(`O email ${mail} não foi encontrado`, 404)
        }

        const payload = {
            mail: findedUser.mail,
            password: findedUser.password
        }

        const options = {
            expiresIn: authConfig.jwt.expiresIn
        }

        const token = sign(payload, authConfig.jwt.secret as Secret, options)
        const link = `${process.env.CLIENT_URL!}/reset-password/${findedUser.mail}/${token}`

        /* await this.mailProvider.sendMail({
            from: 'jhonatan.dev.rios@gmail.com',
            to: mail,
            subject: 'Recuperação de senha',
            body: `<p> Acesse esse link para recuperar sua senha: ${link} </p>`,
        }) */

        return link
    }
}