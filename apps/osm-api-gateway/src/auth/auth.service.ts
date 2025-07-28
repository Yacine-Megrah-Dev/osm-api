import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}
    async register(registerDto: RegisterDto) {
        try {
            console.log(`${JSON.stringify(registerDto)}`);
            return lastValueFrom(
                this.authClient.send({ cmd: 'auth.register' }, registerDto),
            );
        } catch (err) {
            new UnauthorizedException({
                statusCode: 401,
                message: err + '\n Email not Found',
            });
        }
    }

    async login(data: any) {
        try {
            return lastValueFrom(
                this.authClient.send({ cmd: 'auth.login' }, data),
            );
        } catch (err) {
            new UnauthorizedException({
                statusCode: 401,
                message: err + '\n Email not Found',
            });
        }
    }

    async validateToken(token: string) {
        return lastValueFrom(
            this.authClient.send({ cmd: 'auth.validate' }, { token: token }),
        );
    }
}
