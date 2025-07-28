import {
    IsAlpha,
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';
import { IsPhoneNumberForRegion } from '@lib/validators/custom-phone';

export class CreateUserDto {
    @IsAlpha()
    firstName: string;

    @IsAlpha()
    lastName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsString()
    @Length(2, 2)
    countryCode?: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumberForRegion('countryCode', {
        message: 'phone number must be a valid number for the specified region',
    })
    nationalNumber?: string;
}
