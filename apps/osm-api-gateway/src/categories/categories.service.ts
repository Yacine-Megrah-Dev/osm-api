import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CategoriesService {
    constructor(@Inject('ITEMS_CLIENT') private itemsClient: ClientProxy) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return await lastValueFrom(
            this.itemsClient.send(
                { cmd: 'items.createCategory' },
                createCategoryDto,
            ),
        );
    }

    async findAll() {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.findAllCategories' }, {}),
        );
    }

    async findOne(id: number) {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.findOneCategory' }, {}),
        );
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return await lastValueFrom(
            this.itemsClient.send(
                { cmd: 'items.updateCategory' },
                { body: updateCategoryDto },
            ),
        );
    }

    async remove(id: number) {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.removeCategory' }, {}),
        );
    }
}
