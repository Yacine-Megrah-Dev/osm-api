import { Controller, Get } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';

@Controller()
export class AuthAppController {
    constructor(private readonly authService: AuthAppService) {}

    @Get()
    getHello(): string {
        return this.authService.getHello();
    }
}
