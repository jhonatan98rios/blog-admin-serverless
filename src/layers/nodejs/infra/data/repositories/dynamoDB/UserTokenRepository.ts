import { IUserToken } from "src/domain/UserToken";
import { AbstractUserTokenRepository } from "../abstractDB/UserTokenRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";


export class DynamoDBUserTokenRepository implements AbstractUserTokenRepository {

    private docClient: DocumentClient
    private tableName: string

    constructor() {
        this.tableName = "BlogUsersTable"
        this.docClient = new DocumentClient()
    }

    async findByToken(token: string): Promise<IUserToken | undefined> {
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key: { token },
        })
        .promise();

        return result.Item as IUserToken
    }

    async create(userToken: IUserToken): Promise<void> {       
        await this.docClient.put({
            TableName: this.tableName,
            Item: userToken,
        })
        .promise();
    }

    async delete(username: string): Promise<void> {       
        await this.docClient.delete({
            TableName: this.tableName,
            Key: { user: username },
        })
        .promise();
    }
}