import { Injectable, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepository: AdminRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.adminRepository.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }

    const existingEmail = await this.adminRepository.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        statusActive: true,
      },
    });
  }
}
