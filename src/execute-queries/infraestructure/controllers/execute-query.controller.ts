import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { Roles } from "src/auth/infrastructure/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/infrastructure/guards/jwt.guard";
import { PermissionsGuard } from "src/auth/infrastructure/guards/permissions.guard";
import { RolesGuard } from "src/auth/infrastructure/guards/roles.guard";
import { ExecuteQueryDto } from "src/execute-queries/application/dtos/execute-query.dto";
import { ExecuteQueryService } from "src/execute-queries/application/services/execute-query.service";
import { Permissions } from 'src/auth/infrastructure/decorators/permissions.decorator';

@Controller('execute-queries')
//@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class ExecuteQueryController {
  constructor(private readonly executeQueryService: ExecuteQueryService) {}

  //@Permissions('create')
  @Post()
  async executeQuery(@Body(new ValidationPipe()) executeQueryDto: ExecuteQueryDto): Promise<any> {
    try {
      return await this.executeQueryService.execute(executeQueryDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}