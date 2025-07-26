import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponseDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

    findAll(): Promise<UserResponseDto[] | []> {
        return lastValueFrom(
            this.usersClient.send({ cmd: 'users.findAll' }, {}),
        );
    }

    async find(id: number): Promise<UserResponseDto | null> {
        let result = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.findById' }, { id: +id }),
        );

        if (!result) throw new NotFoundException();

        return result;
    }

    async create(
        createUserDto: CreateUserDto,
    ): Promise<UserResponseDto | null> {
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

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserResponseDto | null> {
        return lastValueFrom(
            this.usersClient.send(
                { cmd: 'users.update' },
                { id: +id, body: updateUserDto },
            ),
        );
    }

    async delete(id: number): Promise<UserResponseDto | null> {
        return lastValueFrom(
            this.usersClient.send({ cmd: 'users.delete' }, { id: +id }),
        );
    }

    async disable(id: number): Promise<UserResponseDto | null> {
        return lastValueFrom(
            this.usersClient.send({ cmd: 'users.disable' }, { id: +id }),
        );
    }

    async enable(id: number): Promise<UserResponseDto | null> {
        return lastValueFrom(
            this.usersClient.send({ cmd: 'users.enable' }, { id: +id }),
        );
    }
}
