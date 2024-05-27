// src/admin/infrastructure/repositories/prisma-admin.repository.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { UpdateUserDto } from 'src/admin/application/dtos/update-user.dto';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        usuarios_roles: {
          include: {
            rol: true,
          },
        },
      },
    });
  }

  async findById(id_user: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id_user } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id_user: number, user: Partial<UpdateUserDto>): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id_user },
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

  async create(user: Omit<User, 'id_user'>): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
  
}