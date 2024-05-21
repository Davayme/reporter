// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(createUserDto);
    await this.createUserService.execute(command);
  }
}
