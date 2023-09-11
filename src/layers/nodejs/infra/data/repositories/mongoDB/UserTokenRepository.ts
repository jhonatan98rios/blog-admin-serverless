import { IUserTokenModel, UserTokenModel } from "../../models/UserToken.schema";
import { IUserToken } from "src/domain/UserToken";
import { AbstractUserTokenRepository } from "../abstractDB/UserTokenRepository";
import * as dotenv from 'dotenv'
import Database from "../../database";

const dbConnect = async () => {
    dotenv.config()

    const database = new Database({
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASS!,
        collection: process.env.DATABASE_NAME!,
    })

    await database.connect()
}

export class MongoDBUserTokenRepository implements AbstractUserTokenRepository {

    private userTokenModel: IUserTokenModel

    constructor() {
        dbConnect()
        
        this.userTokenModel = UserTokenModel.getInstance()
    }

    async findByToken(token: string): Promise<IUserToken | undefined> {
        const userToken = await this.userTokenModel.findOne({ token })

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