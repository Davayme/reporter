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
import { RemovePermissionService } from 'src/admin/application/services/remove-permission.service';
import { AssignPermissionService } from 'src/admin/application/services/assign-permission.service';
import { AssignPermissionDto } from 'src/admin/application/dtos/assign-permission.dto';
import { RemovePermissionDto } from 'src/admin/application/dtos/remove-permission.dto';
import { AssignMenuDto } from 'src/admin/application/dtos/assign-menu.dto';
import { RemoveMenuDto } from 'src/admin/application/dtos/remove-menu.dto';
import { AssignMenuService } from 'src/admin/application/services/menu/assign-menu.service';
import { RemoveMenuService } from 'src/admin/application/services/remove-menu.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
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
    private readonly assignPermissionService: AssignPermissionService,
    private readonly removePermissionService: RemovePermissionService,
    private readonly assignMenuService: AssignMenuService,
    private readonly removeMenuService: RemoveMenuService,
  ) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios existentes' })
  @ApiResponse({ status: 200, description: 'Retornar el json con los datos de los usuarios' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('users')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.getAllUsersService.execute();
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Retornar el json del usuario creado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('users')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Id del usuario', type: Number, required: true })
  @Patch('users/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(id, updateUserDto);
    await this.updateUserService.execute(command);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Id del usuario', type: Number, required: true })
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

  //ASIGNAR PERMISOS
  @Post('assign-permission')
  async assignPermission(@Body(new ValidationPipe()) assignPermissionDto: AssignPermissionDto) {
    return this.assignPermissionService.assignPermission(assignPermissionDto);
  }

  @Delete('remove-permission')
  async removePermission(@Body(new ValidationPipe()) removePermissionDto: RemovePermissionDto) {
    return this.removePermissionService.removePermission(removePermissionDto);
  }

  @Post('assign-menu')
  async assignMenu(@Body(new ValidationPipe()) assignMenuDto: AssignMenuDto) {
    return this.assignMenuService.assignMenu(assignMenuDto);
  }

  @Delete('remove-menu')
  async removeMenu(@Body(new ValidationPipe()) removeMenuDto: RemoveMenuDto) {
    return this.removeMenuService.removeMenu(removeMenuDto);
  }

}
