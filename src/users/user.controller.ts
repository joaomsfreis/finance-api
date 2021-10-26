import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    public getAll(): Promise<User[]> {
        return this.userService.getAll(); 
    }

    @Get(':id')
    public async findByName(@Param('id') id: number): Promise<User> {
        const foundUser = await this.userService.findOne(id);    
        return foundUser;
    }

    @Post()
    public async create(@Body() user: User): Promise<NestResponse> {
        const createdUser = await this.userService.create(user);
        
        return new NestResponseBuilder()
            .withStatus(HttpStatus.CREATED)
            .withHeaders({
                'Location': `/users/${createdUser.id}`
            })
            .withBody(createdUser)
            .build();
    }

    @Put()
    public async update(@Body() user: User): Promise<NestResponse> {
        const updatedUser = await this.userService.update(user);

        return new NestResponseBuilder()
            .withStatus(HttpStatus.OK)
            .withHeaders({
                'Location': `/users/${updatedUser.id}`
            })
            .withBody(updatedUser)
            .build();
    }

    @Delete(':id')
    public async remove(@Param() params): Promise<void> {
        this.userService.remove(params.id)
    }
}