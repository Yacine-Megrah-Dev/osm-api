import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto extends PartialType(RegisterDto) {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
