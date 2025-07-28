import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'USERS_CLIENT',
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('USERS_HOST') || 'localhost',
                        port: parseInt(
                            configService.get('USERS_PORT') || '3005',
                            10,
                        ),
                        retryAttempts: 3,
                        retryDelay: 10,
                    },
                }),
            },
        ]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
