/* import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserTokenRepository'; */
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
import { DynamoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserTokenRepository';
import { LogoutSessionService } from './LogoutSessionService';


export class LogoutUserController {

    public async logout(username: string): Promise<any> {

        /* const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository() */

        const userRepository = new DynamoDBUserRepository()
        const userTokenRepository = new DynamoDBUserTokenRepository()
        
        const logoutService = new LogoutSessionService(userRepository, userTokenRepository)
        
        await logoutService.execute(username)
        console.log(`Token of user ${username} deleted`)
        return { status: 202 }
    }
}