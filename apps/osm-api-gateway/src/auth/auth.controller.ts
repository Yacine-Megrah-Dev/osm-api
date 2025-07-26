import { Controller, Post, Put, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(data: any) {
        try {
            return this.authService.register(data);
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }

    @Put('login')
    login(LoginDto: LoginDto) {
        try {
            return this.authService.login(LoginDto);
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }

    @Put('validate-token')
    validate(token: string) {
        try {
            return this.authService.validateToken(token);
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }
}
