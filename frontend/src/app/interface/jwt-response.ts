export interface JwtResponseI {
    dataUser:{
        id: number;
        name: string;
        email: string;
        accesToken: string;
        expiresIn: string;
    }
}

