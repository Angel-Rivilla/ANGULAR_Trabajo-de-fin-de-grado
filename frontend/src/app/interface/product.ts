export interface ProductI {
    id?: number;
    title?: string;
    description?: string;
    price?: string;
    count?: number;
    image?: string;
    createdUser?: string | null;
    createdAt?: Date;
    updateAt?: Date;
}