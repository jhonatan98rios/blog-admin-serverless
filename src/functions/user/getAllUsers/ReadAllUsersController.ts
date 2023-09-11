import { ReadAllUsersService } from './ReadAllUsersService';
//import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';


export class ReadAllUsersController {

    public async readAll(): Promise<any> {

        //const userRepository = new MongoDBUserRepository()
        const userRepository = new DynamoDBUserRepository()
        
        const readAllUsersService = new ReadAllUsersService(userRepository)
        const users = await readAllUsersService.execute()
        return users
    }
}