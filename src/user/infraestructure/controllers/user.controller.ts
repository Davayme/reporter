// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, ValidationPipe, UseFilters, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserService } from '../../application/services/create-user.service';
import { UpdateUserService } from 'src/user/application/services/update-user.service';
import { CreateUserCommand, UpdateUserCommand} from '../../application/commands/user.command';
import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { UpdateUserDto } from 'src/user/application/dtos/update-user.dto';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService
  ) {}

  @Post()
  async create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(createUserDto);
    await this.createUserService.execute(command);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(id, updateUserDto);
    await this.updateUserService.execute(command);
  }
}
