import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    price: number;
}
