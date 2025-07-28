import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesController } from '../categories/categories.controller';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'ITEMS_CLIENT',
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('ITEMS_HOST') || 'localhost',
                        port: configService.get<number>('ITEMS_PORT') || 3002,
                        retryAttempts: 3,
                        retryDelay: 10,
                    },
                }),
            },
        ]),
    ],
    controllers: [ItemsController, CategoriesController],
    providers: [ItemsService, CategoriesService],
})
export class ItemsModule {}
