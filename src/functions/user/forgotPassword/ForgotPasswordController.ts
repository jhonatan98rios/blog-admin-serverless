import SESMailProvider from 'opt/nodejs/infra/providers/SESMailProvider';

import { ForgotPasswordService } from './ForgotPasswordService';
//import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/mongoDB/UserRepository';
import { DynamoDBUserRepository } from 'opt/nodejs/infra/data/repositories/dynamoDB/UserRepository';

export class ForgotPasswordController {

    public async forgotPassword(mail: string): Promise<any> {

        //const userRepository = new MongoDBUserRepository()
        const userRepository = new DynamoDBUserRepository()
        const mailProvider = new SESMailProvider()

        const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

        const result = await forgotPasswordService.execute(mail)
        return result
    }
}