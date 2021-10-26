import { HttpStatus, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

Injectable()
export class UserService {
    private users = [];

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>        
    ) {}
    
    
    public async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    public async findOne(id: number): Promise<User> {
        const foundUser = this.userRepository.findOne(id);

        if(!foundUser) throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Usuário não encontrado.'
        });

        return foundUser;
    }
    
    public async create(user: User): Promise<User> {
        const hasUser = await this.findByEmail(user.email);

        if(hasUser) throw new NotAcceptableException({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: 'Usuário já cadastrado.'
        });

        const createdUser = await this.userRepository.save(user);

        return createdUser;
    }

    public async update(user: User): Promise<User> {
        const updatedUser = await this.userRepository.update(user.id, user);
        
        if(updatedUser.affected === 1) {
            return this.userRepository.findOne(user.id);
        }

        throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Usuário não encontrado.'
        });    

    }
    
    public async remove(id: number): Promise<void> {
        this.userRepository.delete(id);
    }

    private async findByEmail(email: string): Promise<boolean> {
        const countUsers = await this.userRepository.findAndCount({
            where: {
                email
            }
        });

        return countUsers[1] > 0;
    }

}
