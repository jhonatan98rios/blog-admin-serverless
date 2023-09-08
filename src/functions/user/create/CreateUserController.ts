import { IUser } from "opt/nodejs/domain/User"
import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { CreateUserService } from './CreateUserService';


export class CreateUserController {

    public async create({ user, mail, password, consent }: Partial<IUser> ): Promise<any> {

        const userRepository = new MongoDBUserRepository()

        const createUserService = new CreateUserService(userRepository)
        const createdUser = await createUserService.execute({
            user, mail, password, consent
        })

        return createdUser
    }
}