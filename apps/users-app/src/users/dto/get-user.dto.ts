import { PartialType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";
import { User } from "../entities/user.entity";


@Exclude()
export class UserResponseDto extends PartialType(User){
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