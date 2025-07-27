import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    
    async register(createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    async login({ email, password }) {
        const user = await this.usersService.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }
        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        return { access_token: token };
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch {
            return null;
        }
    }
}
