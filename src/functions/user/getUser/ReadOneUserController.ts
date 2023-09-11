import { ReadOneUserService } from './ReadOneUserService';
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
//import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';


export class ReadOneUserController {

    public async readOne(user: string): Promise<any> {
   
        //const userRepository = new MongoDBUserRepository()
        const userRepository = new DynamoDBUserRepository()
        
        const readUserService = new ReadOneUserService(userRepository)
        const findedUser = await readUserService.execute(user)
        return findedUser
    }
}