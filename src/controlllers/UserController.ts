import { MongoDBUserRepository } from 'src/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'src/data/repositories/UserTokenRepository';
import { CreateSessionService } from 'src/services/CreateSessionService';
import { ReadOneUserService } from 'src/services/ReadOneUserService';

export class UserController {

    public async readOne(user: string): Promise<any> {
   
        const userRepository = new MongoDBUserRepository()
        
        const readUserService = new ReadOneUserService(userRepository)
        const findedUser = await readUserService.execute(user)
        return findedUser
    }

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