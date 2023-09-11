//import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
import { UpdateUserService } from './UpdateUserService';

export class UpdateUserController {

    public async update({ username, currentPassword, password, passwordConfirmation }): Promise<any> {

        //const userRepository = new MongoDBUserRepository()
        const userRepository = new DynamoDBUserRepository()

        const updateUserService = new UpdateUserService(userRepository)
        const updatedUser = await updateUserService.execute({
            username, currentPassword, password, passwordConfirmation
        })

        return updatedUser
    }
}