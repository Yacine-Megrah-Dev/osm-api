import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly categoriesService: CategoriesService,
    ) {}

    @MessagePattern({ cmd: 'items.createItem' })
    create(@Payload() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

    @MessagePattern({ cmd: 'items.findAllItems' })
    findAll() {
        return this.itemsService.findAll();
    }

    @MessagePattern({ cmd: 'items.findOneItem' })
    findOne(@Payload() id: number) {
        return this.itemsService.findOne(id);
    }

    @MessagePattern({ cmd: 'items.updateItem' })
    update(
        @Payload('id') id: number,
        @Payload('body') updateItemDto: UpdateItemDto,
    ) {
        return this.itemsService.update(id, updateItemDto);
    }

    @MessagePattern({ cmd: 'items.removeItem' })
    remove(@Payload() id: number) {
        return this.itemsService.remove(id);
    }

    @MessagePattern({ cmd: 'items.createCategory' })
    createCategory(@Payload() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @MessagePattern({ cmd: 'items.findAllCategories' })
    findAllCategories() {
        return this.categoriesService.findAll();
    }

    @MessagePattern({ cmd: 'items.findOneCategory' })
    findOneCategory(@Payload() id: number) {
        return this.categoriesService.findById(id);
    }

    @MessagePattern({ cmd: 'items.updateCategory' })
    updateCategory(
        @Payload('id') id: number,
        @Payload('body') updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @MessagePattern({ cmd: 'items.removeCategory' })
    removeCategory(@Payload() id: number) {
        return this.categoriesService.remove(id);
    }
}
