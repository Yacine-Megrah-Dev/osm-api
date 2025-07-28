import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsAlpha()
    name: string;
}
