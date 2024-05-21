// src/user/infrastructure/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from '../../domain/repositories/user.repository';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async create(user: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
