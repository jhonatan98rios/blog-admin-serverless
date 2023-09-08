import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';
import { CreateSessionService } from './CreateSessionService';


export class LoginUserController {

    public async login(user: string, password: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()
        
        const createSession = new CreateSessionService(userRepository, userTokenRepository)

        const session = await createSession.execute({
            user, password
        })

        return session
    }
}