import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from 'src/user/domain/user.repository';
import { UpdateUserDto } from 'src/user/application/dtos/update-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, user: Partial<UpdateUserDto>): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id_user: id },
        data: user,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        const target = error.meta.target as string[];
        if (target.includes('username')) {
          throw new ConflictException('Username is already taken');
        }
        if (target.includes('email')) {
          throw new ConflictException('Email is already registered');
        }
      }
      throw error;
    }
  }
}