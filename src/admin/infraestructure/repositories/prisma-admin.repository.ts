// src/user/infrastructure/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from '../../domain/repositories/admin.repository';
import { ConflictException } from '@nestjs/common';
import { UpdateUserDto } from 'src/admin/application/dtos/update-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma error code for unique constraint violation
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
  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, user: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: user,
    });
  }
}