import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: 'auth.register' })
    async register(@Payload() data: any) {
        try {
            return this.authService.register(data);
        } catch {
            throw new Error('User Creation failed');
        }
    }

    @MessagePattern({ cmd: 'auth.login' })
    async login(@Payload() data: any) {
        try {
            return this.authService.login(data);
        } catch {
            throw new Error('Bad Login Credentials');
        }
    }

    @MessagePattern({ cmd: 'auth.validate' })
    async validate(@Payload('token') token: string) {
        try {
            return this.authService.validateToken(token);
        } catch {
            throw new Error('Unauthorized jwt token');
        }
    }
}
