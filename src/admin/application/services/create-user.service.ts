// src/admin/application/services/create-user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createUserDto: CreateUserDto) {

    const { username, email, password, roleIds } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
          statusActive: true,
          usuarios_roles: roleIds ? {
            create: roleIds.map(roleId => ({ id_rol: roleId })),
          } : undefined,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }
}
