import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UpdateUserCommand } from '../commands/user.command';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}
  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findByUsername(command.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { email, password } = command.userDto;
    if (email && email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email is already registered');
      }
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      command.userDto.password = await bcrypt.hash(password, salt);
    }
    await this.userRepository.update(user.id_user, command.userDto);
  }

async getUserByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      username: user.username,
      email: user.email,
      // Assuming you want to return the password, be careful with this, generally it's not advised
      password: user.password
    };
  }



}