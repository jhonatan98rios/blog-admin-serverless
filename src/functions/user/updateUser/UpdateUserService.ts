
import { compareHash, generateHash } from "opt/nodejs/infra/utils/hash"
import AppError from "opt/nodejs/infra/utils/AppError"
import { User } from "opt/nodejs/domain/User"
import { AbstractUserRepository } from "opt/nodejs/infra/data/repositories/abstractDB/UserRepository";

type UpdateUserResponse = {
    user: User
}

export type UpdateUserDto = {
    username: string
    currentPassword: string
    password: string
    passwordConfirmation: string
}

export class UpdateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({
        username, currentPassword, password, passwordConfirmation
    }: UpdateUserDto): Promise<UpdateUserResponse> {

        if (password != passwordConfirmation) {
            throw new AppError(`O campo "confirmação de senha" precisa ser igual ao campo senha`);
        }

        const findedUser = await this.userRepository.readOne(username)

        if (!findedUser) {
            throw new AppError(`O usuário ${username} não foi encontrado`, 404)
        }

        const currentPasswordConfirmed = await compareHash(
            currentPassword, 
            findedUser.password
        )

        if (!currentPasswordConfirmed) {
            throw new AppError('A senha atual informada é invalida', 401);
        }

        const hashedPassword = await generateHash(password)

        const updatedUser = new User({
            user: username,
            mail: findedUser.mail,
            password: hashedPassword,
            role: findedUser.role,
            consent: findedUser.consent,
            likedPosts: findedUser.likedPosts
        })

        await this.userRepository.update(username, updatedUser)
        return { user: updatedUser }
    }
}