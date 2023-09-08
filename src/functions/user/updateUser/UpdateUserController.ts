import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { UpdateUserService } from './UpdateUserService';

export class UpdateUserController {

    public async update({ username, currentPassword, password, passwordConfirmation }): Promise<any> {

        const userRepository = new MongoDBUserRepository()

        const updateUserService = new UpdateUserService(userRepository)
        const updatedUser = await updateUserService.execute({
            username, currentPassword, password, passwordConfirmation
        })

        return updatedUser
    }
}