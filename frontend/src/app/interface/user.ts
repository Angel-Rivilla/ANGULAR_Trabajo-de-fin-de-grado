export type Roles = 'SUSCRIPTOR' | 'ADMIN';

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
