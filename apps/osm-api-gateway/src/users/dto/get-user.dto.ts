import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseDto{
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    countryCode: string;
    
    @Expose()
    nationalNumber: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    isActive: boolean;

    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}