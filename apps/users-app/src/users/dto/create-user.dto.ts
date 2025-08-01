import { IsAlpha, IsEmail, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";
import { IsPhoneNumberForRegion } from "./custom-phone-validator.decorator";

export class CreateUserDto {
    @IsAlpha()
    firstName: string;
    
    @IsAlpha()
    lastName: string;

    @IsEmail()
    email: string;
    
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
