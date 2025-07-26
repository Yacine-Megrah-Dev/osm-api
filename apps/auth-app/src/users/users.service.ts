import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponseDto } from './dto/get-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}
    async find(id: number) {
        let result = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.findById' }, { id: +id }),
        );
        return result;
    }

    async create(createUserDto: CreateUserDto) {
        try {
            let result = await lastValueFrom(
                this.usersClient.send({ cmd: 'users.create' }, createUserDto),
            );
            return result;
        } catch (error) {
            console.error('Failed to create user:', error);
            throw new Error('User creation failed');
        }
    }

    async findByEmail(email: string) {
        let result = await lastValueFrom(
            this.usersClient.send(
                { cmd: 'users.findByEmail' },
                { email: email },
            ),
        );
        return result;
    }
}
