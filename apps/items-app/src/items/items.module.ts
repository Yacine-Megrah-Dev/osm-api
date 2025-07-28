import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), CategoriesModule],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
