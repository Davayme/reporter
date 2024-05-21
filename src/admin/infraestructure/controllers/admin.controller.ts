// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, ValidationPipe, UseFilters, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { UpdateUserService } from 'src/admin/application/services/update-user.service';
import { CreateUserCommand, UpdateUserCommand} from '../../application/commands/admin.command';
import { CreateUserDto } from 'src/admin/application/dtos/create-user.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { UpdateUserDto } from 'src/admin/application/dtos/update-user.dto';

@Controller('admin')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly updateUserService: UpdateUserService
  ) {}



  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(id, updateUserDto);
    await this.updateUserService.execute(command);
  }
}
