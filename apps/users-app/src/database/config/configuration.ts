import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

export const dbConValidationSchema = Joi.object({
    type: Joi.string().default('postgres'),
    host: Joi.string().default('localhost'),
    port: Joi.number().default(5432),
    username: Joi.string().default('postgres'),
    password: Joi.string().required(),
    database: Joi.string().required(),
});

export const asyncConnectionOptions: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('USERS_DB_HOST', 'localhost'),
        port: configService.get<number>('USERS_DB_PORT', 5432),
        username: configService.get<string>('USERS_DB_USERNAME', 'postgres'),
        password: configService.get<string>('USERS_DB_PASSWORD'),
        database: configService.get<string>('USERS_DB_NAME', 'users_app_db'),
        synchronize: true,
        logging: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
    }),
};
