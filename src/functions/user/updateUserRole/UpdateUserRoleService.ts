import { User } from "opt/nodejs/domain/User"
import AppError from "opt/nodejs/infra/utils/AppError"
import { roleValidation } from "opt/nodejs/infra/utils/roleValidation"
import { AbstractUserRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserRepository';
import { AbstractUserTokenRepository } from 'opt/nodejs/infra/data/repositories/abstractDB/UserTokenRepository';

type UpdateUserRoleReponse = {
    user: User
}

export type UpdateUserRoleDto = {
    username: string
    role: string
}

export class UpdateUserRoleService {
    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute({
        username, role
    }: UpdateUserRoleDto): Promise<UpdateUserRoleReponse> {

        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`O usuário ${username} não foi encontrado`, 404)
        }

        const updatedUser = new User({
            role: roleValidation(role),
            user: username,
            mail: userAlreadyExists.mail,
            password: userAlreadyExists.password,
            consent: userAlreadyExists.consent,
            likedPosts: userAlreadyExists.likedPosts,
        })

        await this.userRepository.update(username, updatedUser)
        await this.userTokenRepository.delete(username)

        return { user: updatedUser }
    }
}