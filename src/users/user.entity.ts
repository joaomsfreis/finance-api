import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty({
        message: 'O campo name é obrigatório.' 
    })
    @IsString({
        message: 'O campo name deve ser um string.'
    })
    @Column("varchar", { length: 50 })
    name: string;

    @IsEmail({}, {
        message: 'O campo email deve ser um email válido'
    })
    @Column("varchar", { length: 100, unique: true })
    email: string;

    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty({
        message: 'O campo password é obrigatório.'
    })
    @Column("varchar", { length: 100 })
    password: string;

    @IsNotEmpty({
        message: 'O campo fullName é obrigatório.'
    })
    @Column("varchar", { length: 100 })
    fullName: string;

    @CreateDateColumn()
    createdAt: Date;
}