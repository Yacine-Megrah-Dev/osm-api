import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponseDto } from './dto/get-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}
    async find(id: number) {
        return await lastValueFrom(
            this.usersClient.send({ cmd: 'users.findById' }, { id: +id }),
        );
    }

    async create(createUserDto: CreateUserDto) {
        return await lastValueFrom(
            this.usersClient.send({ cmd: 'users.create' }, createUserDto),
        );
    }

    async findByEmail(email: string) {
        return await lastValueFrom(
            this.usersClient.send(
                { cmd: 'users.findByEmail' },
                { email: email },
            ),
        );
    }
}
