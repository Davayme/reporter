import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from '../../infrastructure/dtos/login.dto';
import { RegisterDto } from '../../infrastructure/dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (user.statusActive === false) {
      throw new HttpException('User is inactive', HttpStatus.FORBIDDEN);
    } 
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.roleId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          username: registerDto.username,
          password: hashedPassword,
          email: registerDto.email,
          roleId: registerDto.roleId,
          statusActive: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('Error registering user', HttpStatus.BAD_REQUEST);
    }
  }
}
