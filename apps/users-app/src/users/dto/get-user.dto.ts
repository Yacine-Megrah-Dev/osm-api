import { Exclude, Expose } from 'class-transformer';

@Exclude({ toPlainOnly: true })
export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Exclude()
    password: string;

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
