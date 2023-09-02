import { MongoDBUserRepository } from 'src/data/repositories/UserRepository';
import { MongoDBUserTokenRepository } from 'src/data/repositories/UserTokenRepository';
import { IUser } from 'src/domain/User';
import SESMailProvider from 'src/providers/SESMailProvider';
import { CheckInSessionService } from 'src/services/CheckInSessionService';
import { CreateSessionService } from 'src/services/CreateSessionService';
import { CreateUserService } from 'src/services/CreateUserService';
import { ForgotPasswordService } from 'src/services/ForgotPasswordService';
import { LogoutSessionService } from 'src/services/LogoutSessionService';
import { ReadAllUsersService } from 'src/services/ReadAllUsersService';
import { ReadOneUserService } from 'src/services/ReadOneUserService';
import { ResetPasswordService } from 'src/services/ResetPasswordService';

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

    public async readAll(): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        
        const readAllUsersService = new ReadAllUsersService(userRepository)
        const users = await readAllUsersService.execute()
        return users
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

    public async logout(username: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()
        
        const logoutService = new LogoutSessionService(userRepository, userTokenRepository)
        
        await logoutService.execute(username)
        console.log(`Token of user ${username} deleted`)
        return { status: 202 }
    }

    public async forgotPassword(mail: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const mailProvider = new SESMailProvider()

        const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

        const result = await forgotPasswordService.execute(mail)
        return result
    }

    public async resetPassword(mail, token, password, passwordConfirmation): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const resetPasswordService = new ResetPasswordService(userRepository)

        const updatedUser = await resetPasswordService.execute({ 
            mail, token, password, passwordConfirmation 
        })

        return updatedUser
    }
}