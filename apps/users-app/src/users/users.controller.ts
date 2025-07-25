import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ClassSerializerInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserResponseDto } from 'apps/osm-api-gateway/src/users/dto/get-user.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('health')
    async health() {
      return { status: 'ok' };
    }

    @MessagePattern({cmd: 'users.create'})
    async create(@Payload() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        console.log(`controller received payload:\n${JSON.stringify(createUserDto)}`);
        return this.usersService.create(createUserDto);
    }

    //@Get()
    @MessagePattern({cmd: 'users.findAll'})
    async findAll() {
        return this.usersService.findAll();
    }
    
    @MessagePattern({cmd: 'users.findById'})
    async findOne(@Payload('id') id: number) : Promise<UserResponseDto | null> {
        return this.usersService.findOne(+id);
    }

    @MessagePattern({cmd: 'users.update'})
    async update(@Payload('id') id: number, @Payload('body') updateUserDto: UpdateUserDto) : Promise<UserResponseDto | null> {
        return this.usersService.update(+id, updateUserDto);
    }

    @MessagePattern({cmd: 'users.delete'})
    async remove(@Payload('id') id: number) : Promise<UserResponseDto | null> {
        return this.usersService.remove(+id);
    }

    @MessagePattern({cmd: 'users.disable'})
    async disable(@Payload('id') id: number) : Promise<UserResponseDto | null> {
        return this.usersService.disable(+id);
    }

    @MessagePattern({cmd: 'users.enable'})
    async enable(@Payload('id') id: number) : Promise<UserResponseDto | null> {
        return this.usersService.enable(+id);
    }
}
