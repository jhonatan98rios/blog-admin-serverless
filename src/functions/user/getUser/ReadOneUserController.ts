import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { ReadOneUserService } from './ReadOneUserService';


export class ReadOneUserController {

    public async readOne(user: string): Promise<any> {
   
        const userRepository = new MongoDBUserRepository()
        
        const readUserService = new ReadOneUserService(userRepository)
        const findedUser = await readUserService.execute(user)
        return findedUser
    }
}