import AppError from "src/utils/AppError";
import { IUserTokenModel, UserTokenModel } from "../models/UserToken.schema";
import { IUserToken } from "src/domain/UserToken";


export class MongoDBUserTokenRepository {

    private userTokenModel: IUserTokenModel

    constructor() {
        this.userTokenModel = UserTokenModel.getInstance()
    }

    async findByToken(token: string): Promise<IUserToken | undefined> {
        const userToken = await this.userTokenModel.findOne({ token })

        if (!userToken) {
            throw new AppError('Falha ao autenticar o usuário');
        }

        return userToken
    }

    async create(userToken: IUserToken): Promise<void> {       
        await this.userTokenModel.create(userToken)
    }

    async delete(username: string): Promise<void> {       
        await this.userTokenModel.findOneAndDelete({
            user: username
        })
    }
}