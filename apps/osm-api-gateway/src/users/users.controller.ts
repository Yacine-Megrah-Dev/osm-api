import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('health')
    async health() {
        return { status: 'ok' };
    }

    @Get()
    async findAll(): Promise<UserResponseDto[] | []> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<UserResponseDto | null> {
        return this.usersService.find(id);
    }

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserResponseDto | null> {
        console.log(`Gateway POST: ${JSON.stringify(createUserDto)}`);
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const result = await this.usersService.update(+id, updateUserDto);

        if (!result) {
            throw new NotFoundException();
        }

        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.usersService.delete(+id);
    }

    @Patch('/disable/:id')
    async disable(@Param('id') id: number) {
        return this.usersService.disable(+id);
    }

    @Patch('/enable/:id')
    async enable(@Param('id') id: number) {
        return this.usersService.enable(+id);
    }
}
