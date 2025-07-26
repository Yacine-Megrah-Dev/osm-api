import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
        AuthAppModule,
        {
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: Transport.TCP,
                options: {
                    host: configService.get<string>('AUTH_HOST', 'localhost'),
                    port: configService.get<number>('AUTH_PORT'),
                },
            }),
        },
    );

    await app.listen();

    console.log(`AUTH Microservice running`);
}
bootstrap();
