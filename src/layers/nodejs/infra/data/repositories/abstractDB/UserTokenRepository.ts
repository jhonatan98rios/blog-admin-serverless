import { IUserToken } from "src/domain/UserToken";

export abstract class AbstractUserTokenRepository {

    abstract findByToken(token: string): Promise<IUserToken | undefined>

    abstract create(userToken: IUserToken): Promise<void> 

    abstract delete(username: string): Promise<void>
}