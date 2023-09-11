import { IUser, User } from "opt/nodejs/domain/User";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractUserRepository } from "../abstractDB/UserRepository";


export class DynamoDBUserRepository implements AbstractUserRepository {

    private docClient: DocumentClient
    private tableName: string

    constructor() {
        this.tableName = "BlogUsersTable"
        this.docClient = new DocumentClient()
    }

    async create(user: IUser): Promise<IUser> {
        await this.docClient
            .put({
                TableName: this.tableName,
                Item: user,
            })
            .promise();

        return user;
    }

    async readAll(): Promise<IUser[] | null> {
        const result = await this.docClient
            .scan({
                TableName: this.tableName,
            })
        .promise();

        return result.Items as IUser[];
    }

    async readOne(user: string): Promise<IUser | null> {
        const result = await this.docClient
            .get({
                TableName: this.tableName,
                Key: { user },
            })
            .promise();

        return result.Item as IUser;
    }

    async readOneByMail(mail: string): Promise<IUser | null> {
        const result = await this.docClient
            .get({
                TableName: this.tableName,
                Key: { mail },
            })
            .promise();

        return result.Item as IUser;
    }

    async update(username: string, user: User): Promise<User> {

        console.log(username)

        await this.docClient
            .put({
                TableName: this.tableName,
                Item: user,
            })
            .promise();

        return user;
    }
}