import { IUser } from "src/domain/User";
import { IUserModel, UserModel } from "../models/User.schema";


export class MongoDBUserRepository {

    private userModel: IUserModel

    constructor() {
        this.userModel = UserModel.getInstance()
    }

    async readOne(user: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ user })
        return findedUser
    }
}