import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto){
    @IsOptional()
    declare firstName: string;
    
    @IsOptional()
    declare lastName: string;

    @IsOptional()
    declare email: string;

    @IsOptional()
    declare phone: string;
}