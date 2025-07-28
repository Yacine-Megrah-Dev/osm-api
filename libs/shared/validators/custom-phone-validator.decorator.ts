import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    isPhoneNumber,
} from 'class-validator';
import { CountryCode } from 'libphonenumber-js';

export function IsPhoneNumberForRegion<T>(
    countryCodeProperty: keyof T,
    validationOptions?: ValidationOptions,
) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isPhoneNumberForRegion',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [countryCodeProperty],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const countryCode = (args.object as T)[
                        args.constraints[0]
                    ] as string;
                    const countryCodeTyped = countryCode
                        ? (countryCode as CountryCode)
                        : undefined;
                    if (countryCodeTyped && value) {
                        return isPhoneNumber(value, countryCodeTyped);
                    }
                    if (!countryCodeTyped && value) {
                        return value.startsWith('+') && isPhoneNumber(value);
                    }
                    return false;
                },
            },
        });
    };
}
