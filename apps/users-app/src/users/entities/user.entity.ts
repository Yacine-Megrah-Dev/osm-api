import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CoreEntity } from '../../database/base.entity';

@Entity()
export class User extends CoreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    countryCode: string; // e.g., 'US', 'DZ'

    @Column({ nullable: true })
    nationalNumber: string; // e.g., '2351897718' or '770000000'

    @Column({ nullable: true })
    image: string; // e.g., '2351897718' or '770000000'

    @Column({ default: true })
    declare isActive: boolean;

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
