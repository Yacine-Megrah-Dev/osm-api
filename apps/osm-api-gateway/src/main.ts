import { NestFactory, Reflector } from '@nestjs/core';
import { OsmApiGatewayModule } from './osm-api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(OsmApiGatewayModule);
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    await app.listen(configService.get('API_GATEWAY_PORT') ?? 3000);
}
bootstrap();
