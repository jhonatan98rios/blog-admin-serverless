import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';
import { CheckInSessionService } from './CheckInSessionService';


export class CheckInUserController {

    public async checkIn(token: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()

        const checkInSession = new CheckInSessionService(userRepository, userTokenRepository)

        const session = await checkInSession.execute(token)
        return session
    }
}