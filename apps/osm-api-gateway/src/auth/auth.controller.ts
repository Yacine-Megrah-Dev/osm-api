import { Body, Controller, Post, Put, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() RegisterDto: RegisterDto) {
        console.log(`client gave ${RegisterDto}`)
        return this.authService.register(RegisterDto)
    }

    @Put('login')
    async login(@Body() LoginDto: LoginDto) {
        try {
            return this.authService.login(LoginDto);
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }

    @Put('validate-token')
    async validate(@Body() token: string) {
        try {
            return this.authService.validateToken(token);
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }
}
