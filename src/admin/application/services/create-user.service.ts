// src/admin/application/services/create-user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../../application/dtos/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          password: createUserDto.password,
          email: createUserDto.email,
          statusActive: true,
          usuarios_roles: {
            create: {
              rol: {
                connect: { id_rol: createUserDto.roleId },
              },
            },
          },
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username or email already taken');
      }
      throw error;
    }
  }
}
