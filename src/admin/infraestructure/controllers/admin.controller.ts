import { Controller, Post, Body, ValidationPipe, UseFilters, Patch, Param, ParseIntPipe, Get, Delete, UseGuards } from '@nestjs/common';
import { UpdateUserService } from 'src/admin/application/services/update-user.service';
import { DeleteUserCommand, UpdateUserCommand, CreateUserCommand } from '../../application/commands/admin.command';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { UpdateUserDto } from 'src/admin/application/dtos/update-user.dto';
import { UserResponseDto } from 'src/admin/application/dtos/user-response.dto';
import { GetAllUsersService } from 'src/admin/application/services/get-all-users.service';
import { DeleteUserService } from 'src/admin/application/services/delete-user.service';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';
import { CreateUserDto } from 'src/admin/application/dtos/create-user.dto';
import { CreateUserService } from 'src/admin/application/services/create-user.service';
import { AssignRoleService } from 'src/admin/application/services/assign-role.service';
import { AssignRoleDto } from 'src/admin/application/dtos/assign-role.dto';
import { RemoveRoleService } from 'src/admin/application/services/remove-role.service';
import { RemoveRoleDto } from 'src/admin/application/dtos/remove-role.dto';

@Controller('admin')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly getAllUsersService: GetAllUsersService,
    private readonly deleteUserService: DeleteUserService,
    private readonly assignRoleService: AssignRoleService,
    private readonly removeRoleService: RemoveRoleService,
  ) {}

  @Get('users')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.getAllUsersService.execute();
  }

  @Post('users')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
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

  @Post('users/assign-roles')
  async assignRoles(@Body(new ValidationPipe()) assignRoleDto: AssignRoleDto) {
    return this.assignRoleService.assignRoles(assignRoleDto);
  }

  @Post('users/remove-roles')
  async removeRoles(@Body(new ValidationPipe()) removeRoleDto: RemoveRoleDto) {
    return this.removeRoleService.removeRoles(removeRoleDto);
  }
}
