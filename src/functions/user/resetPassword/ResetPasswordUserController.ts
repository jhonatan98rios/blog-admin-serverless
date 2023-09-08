import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import { ResetPasswordService } from './ResetPasswordService';


export class ResetPasswordUserController {

    public async resetPassword(mail, token, password, passwordConfirmation): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const resetPasswordService = new ResetPasswordService(userRepository)

        const updatedUser = await resetPasswordService.execute({ 
            mail, token, password, passwordConfirmation 
        })

        return updatedUser
    }
}