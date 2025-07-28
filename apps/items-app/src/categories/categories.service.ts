import { Dependencies, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../items/dto/create-category.dto';
import { UpdateCategoryDto } from '../items/dto/update-category.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Dependencies(getRepositoryToken(Category))
@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: Repository<Category>) {}
    async create(createCategoryDto: CreateCategoryDto) {
        return this.categoriesRepository.create(createCategoryDto);
    }

    async findAll() {
        return this.categoriesRepository.find();
    }

    async findById(id: number) {
        return this.categoriesRepository.findOneBy({ id });
    }

    async findByName(name: string) {
        return this.categoriesRepository.findOneBy({ name });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoriesRepository.findOneBy({ id: +id });

        if (!category) return null;

        Object.assign(category, updateCategoryDto);

        return this.categoriesRepository.save(category);
    }

    async remove(id: number) {
        const category = await this.categoriesRepository.findOneBy({ id: +id });
        if (!category) return null;
        return this.categoriesRepository.remove(category);
    }
}
