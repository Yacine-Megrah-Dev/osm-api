import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ItemsService {
    constructor(@Inject('ITEMS_CLIENT') private itemsClient: ClientProxy) {}

    async create(createItemDto: CreateItemDto) {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.createItem' }, createItemDto),
        );
    }

    async findAll() {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.findAllItems' }, {}),
        );
    }

    async findOne(id: number) {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.findOneItem' }, {}),
        );
    }

    async update(id: number, updateItemDto: UpdateItemDto) {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.updateItem' }, {}),
        );
    }

    async remove(id: number) {
        return await lastValueFrom(
            this.itemsClient.send({ cmd: 'items.removeItem' }, {}),
        );
    }
}
