import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        }),
        UsersModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
    controllers: [AuthAppController],
})
export class AuthAppModule {}
