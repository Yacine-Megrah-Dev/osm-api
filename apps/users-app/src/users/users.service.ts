import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from 'apps/osm-api-gateway/src/users/dto/get-user.dto';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
    constructor(private usersRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto) : Promise<UserResponseDto>{
        let user = this.usersRepository.create(createUserDto);

        console.log(`new user created ${user}`);

        // TODO - Password & other secrets not implemented yet.

        return this.usersRepository.save(user);
    }

    async findAll() : Promise<User[] | []> {
        return this.usersRepository.find();
    }

    async findOne(id: number) : Promise<User | null> {
        return this.usersRepository.findOneBy({id:+id});
    }

    async update(id: number, updateUserDto: UpdateUserDto) : Promise<User | null> {
        let user = await this.usersRepository.findOneBy({id:+id});

        if (!user) return null;

        Object.assign(user, updateUserDto);

        return this.usersRepository.save(user); 
    }

    async remove(id: number) : Promise<User | null> {
        let user = await this.usersRepository.findOneBy({id:+id});
        if (!user) return null;
        return this.usersRepository.remove(user);
    }

    async disable(id: number) : Promise<User | null> {
        let user = await this.usersRepository.findOneBy({id:+id});
        
        if (!user) return null;

        user.isActive = false;

        return this.usersRepository.save(user);
    }

    async enable(id: number) : Promise<User | null> {
        let user = await this.usersRepository.findOneBy({id:+id});
        
        if (!user) return null;

        user.isActive = false;

        return this.usersRepository.save(user);
    }
}
