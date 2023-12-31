import { MongoDBUserRepository } from "src/data/repositories/UserRepository"
import { IUser, Roles, User } from "src/domain/User"
import AppError from "src/utils/AppError"
import { generateHash } from "src/utils/hash"

type CreateUserResponse = {
    user: User
}

export class CreateUserService {
    constructor(private userRepository: MongoDBUserRepository) {}

    async execute({ user, mail, password, consent }: Partial<IUser>): Promise<CreateUserResponse> {

        const userAlreadyExists = await this.userRepository.readOne(user)

        if (userAlreadyExists) {
            throw new AppError('Esse nome de usuário já esta sendo utilizado por outro usuário', 409)
        }

        const mailAlreadyExists = await this.userRepository.readOneByMail(mail)

        if (mailAlreadyExists) {
            throw new AppError('Esse e-mail já esta sendo utilizado por outro usuário', 409)
        }

        const hashedPassword = await generateHash(password)

        const createdUser = new User({
            user,
            mail,
            role: Roles.READ,
            password: hashedPassword,
            consent,
            likedPosts: []
        })

        await this.userRepository.create(createdUser)
        return { user: createdUser }
    }
}