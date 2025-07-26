import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { IsPhoneNumberForRegion } from './custom-phone-validator.decorator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @Length(2, 2) // ISO 3166-1 alpha-2 codes are 2 characters
    countryCode?: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumberForRegion('countryCode', {
        message: 'phone number must be a valid number for the specified region',
    })
    nationalNumber?: string;
}
