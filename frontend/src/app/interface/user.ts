export type Roles = 'reader' | 'admin';

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
