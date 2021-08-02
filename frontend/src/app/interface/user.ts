export type Roles = 'reader' | 'admin' ;

export interface UserBD{
    id?: number;
    username?: string;
    password?: string;
    role?: Roles;
    createdAt?: Date;
    updateAt?: Date;
}

export interface UserI {
   username: string;
   password: string;
}

export interface UserResponseI {
    message: string;
    token: string;
    userId: number;
    role: Roles;
}
