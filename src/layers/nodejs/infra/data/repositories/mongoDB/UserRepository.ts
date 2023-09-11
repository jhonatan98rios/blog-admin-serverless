import { IUser, User } from "opt/nodejs/domain/User";
import { IUserModel, UserModel } from "../../models/User.schema";
import { AbstractUserRepository } from "../abstractDB/UserRepository";
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

export class MongoDBUserRepository implements AbstractUserRepository {

    private userModel: IUserModel

    constructor() {
        dbConnect()

        this.userModel = UserModel.getInstance()
    }

    async create(user: IUser): Promise<IUser> {
        await this.userModel.create(user)
        return user
    }

    async readAll(): Promise<IUser[] | null> {
        const users = await this.userModel.find()
        return users
    }

    async readOne(user: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ user })
        return findedUser
    }

    async readOneByMail(mail: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ mail })
        return findedUser
    }

    async update(username: string, user: User): Promise<User> {
        await this.userModel.findOneAndUpdate({ user: username }, user)
        return user
    }
}