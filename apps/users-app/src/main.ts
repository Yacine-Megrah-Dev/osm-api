import { NestFactory, Reflector } from '@nestjs/core';
import { UsersAppModule } from './users-app.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
        UsersAppModule,
        {
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: Transport.TCP,
                options: {
                    host: configService.get<string>('USERS_HOST', 'localhost'),
                    port: configService.get<number>('USERS_PORT'),
                },
            }),
        },
    );
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listen();
    console.log('Users microservice is running');
}
bootstrap();
