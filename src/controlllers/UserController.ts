import { MongoDBUserRepository } from 'src/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'src/data/repositories/UserTokenRepository';
import { IUser } from 'src/domain/User';
import { CheckInSessionService } from 'src/services/CheckInSessionService';
import { CreateSessionService } from 'src/services/CreateSessionService';
import { CreateUserService } from 'src/services/CreateUserService';
import { ReadOneUserService } from 'src/services/ReadOneUserService';

export class UserController {

    public async create({ user, mail, password, consent }: Partial<IUser> ): Promise<any> {

        const userRepository = new MongoDBUserRepository()

        const createUserService = new CreateUserService(userRepository)
        const createdUser = await createUserService.execute({
            user, mail, password, consent
        })

        return createdUser
    }

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

    public async checkIn(token: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()

        const checkInSession = new CheckInSessionService(userRepository, userTokenRepository)

        const session = await checkInSession.execute(token)
        return session
    }
}