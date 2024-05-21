// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, ValidationPipe, UseFilters, Patch, Param, ParseIntPipe, Get, Delete } from '@nestjs/common';
import { UpdateUserService } from 'src/admin/application/services/update-user.service';
import { DeleteUserCommand, UpdateUserCommand} from '../../application/commands/admin.command';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { UpdateUserDto } from 'src/admin/application/dtos/update-user.dto';
import { UserResponseDto } from 'src/admin/application/dtos/user-response.dto';
import { GetAllUsersService } from 'src/admin/application/services/get-all-users.service';
import { DeleteUserService } from 'src/admin/application/services/delete-user.service';

@Controller('admin')
@UseFilters(HttpExceptionFilter)
export class AdminController {
  constructor(
    private readonly updateUserService: UpdateUserService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly deleteUserService: DeleteUserService
  ) {}

  @Get('users')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.getAllUsersService.execute();
  }

  @Patch('users/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(id, updateUserDto);
    await this.updateUserService.execute(command);
  }

  @Delete('users/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteUserCommand(id);
    await this.deleteUserService.execute(command);
  }
}
