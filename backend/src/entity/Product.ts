import {Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, Column} from "typeorm";
import {MinLength, IsNotEmpty, MaxLength} from "class-validator";

@Entity()

export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    title: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    description: string;

    @Column()
    @MaxLength(5)
    @MinLength(2)
    @IsNotEmpty()
    price: string;

    @Column()
    @MinLength(6)
    image: string;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}