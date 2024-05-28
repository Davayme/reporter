import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginDto } from '../../infrastructure/dtos/login.dto';
import { RegisterDto } from '../../infrastructure/dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { GetPermissionsService } from 'src/menu/application/services/get-permissions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly getPermissionsService: GetPermissionsService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { usuarios_roles: { include: { rol: true } } },
    });

    if (user && user.statusActive === false) {
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
      sub: user.id_user,
      role: user.usuarios_roles[0]?.rol.rol, // asume que un usuario tiene un rol principal
    };
    const menusWithPermissions = await this.getPermissionsService.getMenusAndPermissionsByUserId(user.id_user);
    
    return {
      access_token: this.jwtService.sign(payload),
      menus: menusWithPermissions,
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
          statusActive: true,
          usuarios_roles: {
            create: {
              id_rol: registerDto.roleId,
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('Error registering user', HttpStatus.BAD_REQUEST);
    }
  }
}
