import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';
import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';

import { User } from "opt/nodejs/domain/User"
import AppError from "opt/nodejs/infra/utils/AppError"
import { roleValidation } from "opt/nodejs/infra/utils/roleValidation"

type UpdateUserRoleReponse = {
    user: User
}

export type UpdateUserRoleDto = {
    username: string
    role: string
}

export class UpdateUserRoleService {
    constructor(
        private userRepository: MongoDBUserRepository,
        private userTokenRepository: MongoDBUserTokenRepository
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