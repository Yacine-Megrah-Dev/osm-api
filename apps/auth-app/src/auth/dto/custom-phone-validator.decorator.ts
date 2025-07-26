import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    isPhoneNumber,
} from 'class-validator';
import { CountryCode } from 'libphonenumber-js'; // Import CountryCode type

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

                    // If countryCode is provided, cast it to CountryCode type
                    const countryCodeTyped = countryCode
                        ? (countryCode as CountryCode)
                        : undefined;

                    // If both fields are provided, validate them together
                    if (countryCodeTyped && value) {
                        // The fix is here: pass the typed countryCode
                        return isPhoneNumber(value, countryCodeTyped);
                    }
                    // If only nationalNumber is provided, it's not valid without a country code
                    // (or you could adjust logic if you want to infer from international format)
                    if (!countryCodeTyped && value) {
                        // If no country code is provided, and the value is present,
                        // you might want to consider it an international number if it starts with '+'
                        // For now, let's assume it's invalid without a country code or '+' prefix.
                        return false;
                    }
                    // If neither or only countryCode is provided, and nationalNumber is optional, it's valid
                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    const [countryCodeProperty] = args.constraints;
                    const countryCode = (args.object as T)[
                        countryCodeProperty
                    ] as string;
                    return `${args.property} must be a valid phone number for the region ${countryCode || 'specified'}.`;
                },
            },
        });
    };
}
