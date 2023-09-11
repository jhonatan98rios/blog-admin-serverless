/* import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserTokenRepository'; */
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
import { DynamoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserTokenRepository';
import { CreateSessionService } from './CreateSessionService';


export class LoginUserController {

    public async login(user: string, password: string): Promise<any> {

        /* const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository() */

        const userRepository = new DynamoDBUserRepository()
        const userTokenRepository = new DynamoDBUserTokenRepository()
        
        const createSession = new CreateSessionService(userRepository, userTokenRepository)

        const session = await createSession.execute({
            user, password
        })

        return session
    }
}