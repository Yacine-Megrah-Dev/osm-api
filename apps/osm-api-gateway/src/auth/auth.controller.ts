import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() RegisterDto: RegisterDto) {
        console.log(`client gave ${RegisterDto}`);
        return this.authService.register(RegisterDto);
    }

    @Post('login')
    async login(@Body() LoginDto: LoginDto) {
        const result = await this.authService.login(LoginDto);
        try {
            if (result.status === 404) {
                throw new UnauthorizedException({
                    statusCode: 401,
                    message: `Email doesn't exist`,
                });
            }
            return result;
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }

    @Post('validate-token')
    async validate(@Body() token: string) {
        try {
            return this.authService.validateToken(token);
        } catch (err) {
            throw new UnauthorizedException({ statusCode: 401, message: err });
        }
    }
}
