import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: 'register' })
    register(data: any) {
        try {
            return this.authService.register(data);
        } catch {
            throw new Error('User Creation failed');
        }
    }

    @MessagePattern({ cmd: 'login' })
    login(data: any) {
        try {
            return this.authService.login(data);
        } catch {
            throw new Error('Bad Login Credentials');
        }
    }

    @MessagePattern({ cmd: 'validate-token' })
    validate(token: string) {
        try {
            return this.authService.validateToken(token);
        } catch {
            throw new Error('Unauthorized jwt token');
        }
    }
}
