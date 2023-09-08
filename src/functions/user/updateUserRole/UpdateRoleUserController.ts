import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';
import { UpdateUserRoleService } from './UpdateUserRoleService';

export class UpdateRoleUserController {

    public async updateRole({ username, role }): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()

        const updateUserRoleService = new UpdateUserRoleService(userRepository, userTokenRepository)
        const updatedUser = await updateUserRoleService.execute({
            username, role
        })

        return updatedUser
    }
}