// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { CreateUserCommand } from '../../application/commands/create-user.command';

@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() body: { username: string; password: string; email: string; roleId: number }) {
    const command = new CreateUserCommand(body.username, body.password, body.email, body.roleId);
    await this.createUserService.execute(command);
  }
}
