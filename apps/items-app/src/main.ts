import { NestFactory, Reflector } from '@nestjs/core';
import { ItemsAppModule } from './items-app.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
        ItemsAppModule,
        {
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: Transport.TCP,
                options: {
                    host: configService.get<string>('ITEMS_HOST', 'localhost'),
                    port: configService.get<number>('ITEMS_PORT'),
                },
            }),
        },
    );
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe());
    await app.listen();
    console.log(
        `ITEMS Microservice is running on port ${app.get(ConfigService).get('ITEMS_PORT')}`,
    );
}
bootstrap();
