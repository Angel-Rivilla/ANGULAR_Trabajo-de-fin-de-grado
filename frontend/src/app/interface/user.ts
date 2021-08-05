export type Roles = 'reader' | 'admin' ;

export interface UserBD{
    id?: number;
    username?: string;
    password?: string;
    role?: Roles;
    resetToken?: string;
    createdAt?: Date;
    updateAt?: Date;
}

export interface UserI {
    username: string;
    password: string;
}

export interface UserReset {
    message : string;
    info: string;
    user: UserBD;
}


export interface UserResponseI {
    message: string;
    token: string;
    userId: number;
    role: Roles;
}
