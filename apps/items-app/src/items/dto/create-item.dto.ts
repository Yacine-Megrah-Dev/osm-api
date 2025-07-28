import {
    IsAlpha,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsArray({})
    @IsAlpha(undefined, { each: true })
    options: string[];
}
