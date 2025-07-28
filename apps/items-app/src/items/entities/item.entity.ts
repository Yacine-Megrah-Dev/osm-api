import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CoreEntity } from '../../database/base.entity';

@Entity()
export class Item extends CoreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    //Category

    @Column('varchar', { array: true, nullable: true, default: [] })
    options: string[];

    @Column('float')
    price: number;

    @CreateDateColumn()
    declare createdAt: Date;

    @UpdateDateColumn()
    declare updatedAt: Date;

    @Column({ default: true })
    declare isActive: boolean;
}
