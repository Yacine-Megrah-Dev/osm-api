import { Dependencies, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriesService } from '../categories/categories.service';
import { Repository } from 'typeorm';

@Dependencies(getRepositoryToken(Item))
@Injectable()
export class ItemsService {
    constructor(
        private itemsRepository: Repository<Item>,
        private categoriesService: CategoriesService,
    ) {}

    async create(createItemDto: CreateItemDto) {
        const { category, ...Data } = createItemDto;
        let category_entity = await this.categoriesService.findByName(category);
        if (!category_entity) {
            category_entity = await this.categoriesService.create({
                name: category,
            });
            console.log(
                `created new Category: ${JSON.stringify(category_entity)}`,
            );
        }
        const cat_id = category_entity.id;
        const toCreate = { id: cat_id, ...Data };
        return this.itemsRepository.create(toCreate);
    }

    async findAll() {
        return this.itemsRepository.find();
    }

    async findOne(id: number) {
        return this.itemsRepository.findOneBy({ id });
    }

    // async findOneByCategory(id: number) {
    //     return this.itemsRepository.findOneBy({id});
    // }

    async update(id: number, updateItemDto: UpdateItemDto) {
        const item = await this.itemsRepository.findOneBy({ id });
        if (!item) {
            throw new Error('Item Not Found');
        }

        const { category, ...Data } = updateItemDto;
        let category_entity = await this.categoriesService.findByName(category);
        if (!category_entity) {
            category_entity = await this.categoriesService.create({
                name: category,
            });
            console.log(
                `created new Category: ${JSON.stringify(category_entity)}`,
            );
        }

        Object.assign(item, [{ id: category_entity.id }, Data]);

        return this.itemsRepository.save(item);
    }

    async remove(id: number) {
        const item = await this.itemsRepository.findOneBy({ id });
        if (!item) {
            throw new Error('Item Not Found');
        }
        return this.itemsRepository.remove(item);
    }
}
