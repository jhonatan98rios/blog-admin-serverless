import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'opt/nodejs/infra/data/repositories/UserTokenRepository';
import { LogoutSessionService } from './LogoutSessionService';


export class LogoutUserController {

    public async logout(username: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()
        
        const logoutService = new LogoutSessionService(userRepository, userTokenRepository)
        
        await logoutService.execute(username)
        console.log(`Token of user ${username} deleted`)
        return { status: 202 }
    }
}