import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_CLIENT') private authClient: ClientProxy) {}
    register(data: any) {
        return this.authClient.send({ cmd: 'auth.register' }, data);
    }

    login(data: any) {
        return this.authClient.send({ cmd: 'auth.login' }, data);
    }

    validateToken(token: string) {
        return this.authClient.send({ cmd: 'auth.validate' }, token);
    }
}
