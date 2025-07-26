import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getWelcome() {
        return {
            message: 'OSM API Gateway',
            version: '1.0.0',
            endpoints: {
                users: '/users',
                health: '/health',
            },
        };
    }

    @Get('health')
    getHealth() {
        return { status: 'ok', service: 'api-gateway' };
    }
}
