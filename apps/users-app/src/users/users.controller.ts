import {
    Controller,
    ClassSerializerInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@lib/dto/create-user';
import { UpdateUserDto } from '@lib/dto/update-user';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './entities/user.entity';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'users.create' })
    async create(
        @Payload() createUserDto: CreateUserDto,
    ): Promise<User | null> {
        return this.usersService.create(createUserDto);
    }

    //@Get()
    @MessagePattern({ cmd: 'users.findAll' })
    async findAll(): Promise<User[] | []> {
        return this.usersService.findAll();
    }

    @MessagePattern({ cmd: 'users.findById' })
    async findOne(@Payload('id') id: number): Promise<User | null> {
        return this.usersService.findOne(+id);
    }

    @MessagePattern({ cmd: 'users.findByEmail' })
    async findByEmail(@Payload('email') email: string): Promise<User | null> {
        return this.usersService.findByEmail(email);
    }

    @MessagePattern({ cmd: 'users.update' })
    async update(
        @Payload('id') id: number,
        @Payload('body') updateUserDto: UpdateUserDto,
    ): Promise<User | null> {
        return this.usersService.update(+id, updateUserDto);
    }

    @MessagePattern({ cmd: 'users.delete' })
    async remove(@Payload('id') id: number): Promise<User | null> {
        return this.usersService.remove(+id);
    }

    @MessagePattern({ cmd: 'users.disable' })
    async disable(@Payload('id') id: number): Promise<User | null> {
        return this.usersService.disable(+id);
    }

    @MessagePattern({ cmd: 'users.enable' })
    async enable(@Payload('id') id: number): Promise<User | null> {
        return this.usersService.enable(+id);
    }
}
