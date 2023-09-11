//import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';
import { ResetPasswordService } from './ResetPasswordService';


export class ResetPasswordUserController {

    public async resetPassword(mail, token, password, passwordConfirmation): Promise<any> {

        //const userRepository = new MongoDBUserRepository()
        const userRepository = new DynamoDBUserRepository()
        const resetPasswordService = new ResetPasswordService(userRepository)

        const updatedUser = await resetPasswordService.execute({ 
            mail, token, password, passwordConfirmation 
        })

        return updatedUser
    }
}