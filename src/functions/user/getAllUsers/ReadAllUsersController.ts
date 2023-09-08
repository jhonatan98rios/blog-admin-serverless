import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { ReadAllUsersService } from './ReadAllUsersService';


export class ReadAllUsersController {

    public async readAll(): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        
        const readAllUsersService = new ReadAllUsersService(userRepository)
        const users = await readAllUsersService.execute()
        return users
    }
}