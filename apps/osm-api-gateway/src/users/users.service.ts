import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponseDto } from './dto/get-user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

    async findAll(): Promise<UserResponseDto[] | []> {
        const result: Array<unknown> = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.findAll' }, {}),
        );
        // Mask password
        return plainToInstance(UserResponseDto, result, {
            excludeExtraneousValues: false,
        });
    }

    async find(id: number): Promise<UserResponseDto | null> {
        const result = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.findById' }, { id: +id }),
        );
        if (!result) throw new NotFoundException();
        // Mask password
        return plainToInstance(UserResponseDto, result, {
            excludeExtraneousValues: false,
        });
    }

    async create(
        createUserDto: CreateUserDto,
    ): Promise<UserResponseDto | null> {
        try {
            const result = await lastValueFrom(
                this.usersClient.send({ cmd: 'users.create' }, createUserDto),
            );
            // Mask password
            return plainToInstance(UserResponseDto, result, {
                excludeExtraneousValues: false,
            });
        } catch (error) {
            console.error('Failed to create user:', error);
            throw new Error('User creation failed');
        }
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserResponseDto | null> {
        const result = await lastValueFrom(
            this.usersClient.send(
                { cmd: 'users.update' },
                { id: +id, body: updateUserDto },
            ),
        );
        // Mask password
        return plainToInstance(UserResponseDto, result, {
            excludeExtraneousValues: false,
        });
    }

    async delete(id: number): Promise<UserResponseDto | null> {
        const result = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.delete' }, { id: +id }),
        );
        // Mask password
        return plainToInstance(UserResponseDto, result, {
            excludeExtraneousValues: false,
        });
    }

    async disable(id: number): Promise<UserResponseDto | null> {
        const result = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.disable' }, { id: +id }),
        );
        // Mask password
        return plainToInstance(UserResponseDto, result, {
            excludeExtraneousValues: false,
        });
    }

    async enable(id: number): Promise<UserResponseDto | null> {
        const result = await lastValueFrom(
            this.usersClient.send({ cmd: 'users.enable' }, { id: +id }),
        );
        // Mask password
        return plainToInstance(UserResponseDto, result, {
            excludeExtraneousValues: false,
        });
    }
}
