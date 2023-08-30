export enum Roles {
    READ = 'read',
    WRITE = 'write',
    ADMIN = 'admin'
}

export interface IUser {
    user: string
    mail: string
    password: string
    role: Roles
    consent: boolean
    likedPosts: string[]
}
