import { Module } from '@nestjs/common';
import { AdminController } from './infraestructure/controllers/admin.controller';
import { PrismaAdminRepository } from './infraestructure/repositories/prisma-admin.repository';
import { CreateUserService } from './application/services/create-user.service';
import { UpdateUserService } from './application/services/update-user.service';
import { GetAllUsersService } from './application/services/get-all-users.service';
import { DeleteUserService } from './application/services/delete-user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssignRoleService } from './application/services/assign-role.service';
import { RemoveRoleService } from './application/services/remove-role.service';
import { AssignPermissionService } from './application/services/assign-permission.service';
import { RemovePermissionService } from './application/services/remove-permission.service';
import { AssignMenuService } from './application/services/menu/assign-menu.service';
import { RemoveMenuService } from './application/services/remove-menu.service';

@Module({
  imports : [PrismaModule],
  controllers: [AdminController],
  providers: [
    PrismaAdminRepository,
    {
      provide: 'AdminRepository',
      useExisting: PrismaAdminRepository,
    },
    CreateUserService,
    UpdateUserService,
    GetAllUsersService,
    DeleteUserService,
    AssignPermissionService,
    RemovePermissionService,
    AssignRoleService,
    RemoveRoleService,
    AssignMenuService,
    RemoveMenuService,
  ],
  exports: [
    CreateUserService,
    UpdateUserService,
    GetAllUsersService
  ],
})
export class AdminModule {}
