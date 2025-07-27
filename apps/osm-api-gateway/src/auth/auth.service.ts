import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}
    async register(registerDto: RegisterDto) {
        console.log(`${JSON.stringify(registerDto)}`)
        return lastValueFrom(
            this.authClient.send({ cmd: 'auth.register' }, registerDto),
        );
    }

    async login(data: any) {
        return lastValueFrom(this.authClient.send({ cmd: 'auth.login' }, data));
    }

    async validateToken(token: string) {
        return lastValueFrom(
            this.authClient.send({ cmd: 'auth.validate' }, { token: token }),
        );
    }
}
