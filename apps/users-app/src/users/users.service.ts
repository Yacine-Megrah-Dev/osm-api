import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '@lib/dto/create-user';
import { UpdateUserDto } from '@lib/dto/update-user';
import * as bcrypt from 'bcrypt';
// Removed DTO and transformer for microservice raw entity usage

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
    constructor(private usersRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User | null> {
        const password = createUserDto.password;
        try {
            createUserDto.password = await bcrypt.hash(password, 10);
        } catch {
            throw new Error('user creation error (failed to hash)');
        }

        const user = this.usersRepository.create(createUserDto);

        console.log(`new user created ${user}`);

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[] | []> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id: +id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email: email });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ id: +id });

        if (!user) return null;

        Object.assign(user, updateUserDto);

        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ id: +id });
        if (!user) return null;
        return this.usersRepository.remove(user);
    }

    async disable(id: number): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ id: +id });

        if (!user) return null;

        user.isActive = false;

        return this.usersRepository.save(user);
    }

    async enable(id: number): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ id: +id });

        if (!user) return null;

        user.isActive = false;

        return this.usersRepository.save(user);
    }
}
