import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { Roles } from "src/auth/infrastructure/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/infrastructure/guards/jwt.guard";
import { PermissionsGuard } from "src/auth/infrastructure/guards/permissions.guard";
import { RolesGuard } from "src/auth/infrastructure/guards/roles.guard";
import { Permissions } from 'src/auth/infrastructure/decorators/permissions.decorator';
import { ExecuteTemplateService } from "src/generate-templates/application/services/execute-template.service";

@Controller('generateTemplates')
export class ExecuteQueryController {
  constructor(private readonly executeTemplates : ExecuteTemplateService) {}

  @Post()
  async executeTemplate(
    @Body('id_template', ParseIntPipe) id_template: number,
    @Body('type') type: string
  ): Promise<any> {
    return this.executeTemplates.executeTemplate(id_template, type);
  }
}