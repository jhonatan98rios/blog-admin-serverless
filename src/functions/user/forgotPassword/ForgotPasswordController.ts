import { MongoDBUserRepository } from 'opt/nodejs/infra/data/repositories/UserRepository';
import SESMailProvider from 'opt/nodejs/infra/providers/SESMailProvider';

import { ForgotPasswordService } from './ForgotPasswordService';

export class ForgotPasswordController {

    public async forgotPassword(mail: string): Promise<any> {

        const userRepository = new MongoDBUserRepository()
        const mailProvider = new SESMailProvider()

        const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

        const result = await forgotPasswordService.execute(mail)
        return result
    }
}