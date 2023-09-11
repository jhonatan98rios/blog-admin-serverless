/* import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserTokenRepository'; */
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserTokenRepository';
import { UpdateUserRoleService } from './UpdateUserRoleService';

export class UpdateRoleUserController {
    public async updateRole({ username, role }): Promise<any> {

        //const userRepository = new MongoDBUserRepository()
        //const userTokenRepository = new MongoDBUserTokenRepository()

        const userRepository = new DynamoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()

        const updateUserRoleService = new UpdateUserRoleService(userRepository, userTokenRepository)
        const updatedUser = await updateUserRoleService.execute({
            username, role
        })

        return updatedUser
    }
}