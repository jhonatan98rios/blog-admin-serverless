/* import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserTokenRepository'; */
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
import { DynamoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserTokenRepository';
import { CheckInSessionService } from './CheckInSessionService';


export class CheckInUserController {

    public async checkIn(token: string): Promise<any> {

        /* const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository() */

        const userRepository = new DynamoDBUserRepository()
        const userTokenRepository = new DynamoDBUserTokenRepository()

        const checkInSession = new CheckInSessionService(userRepository, userTokenRepository)

        const session = await checkInSession.execute(token)
        return session
    }
}