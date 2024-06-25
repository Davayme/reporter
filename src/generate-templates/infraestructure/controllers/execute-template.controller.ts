import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { Roles } from "src/auth/infrastructure/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/infrastructure/guards/jwt.guard";
import { PermissionsGuard } from "src/auth/infrastructure/guards/permissions.guard";
import { RolesGuard } from "src/auth/infrastructure/guards/roles.guard";
import { Permissions } from 'src/auth/infrastructure/decorators/permissions.decorator';
import { ExecuteTemplateService } from "src/generate-templates/application/services/execute-template.service";
import { ExecuteTemplateDto } from "src/generate-templates/application/dtos/execute-template";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('generateTemplates')
@Controller('generateTemplates')
export class ExecuteQueryController {
  constructor(private readonly executeTemplates : ExecuteTemplateService) {}

  @ApiOperation({ summary: 'Obtener el json de datos de un determinado template' })
  @ApiResponse({ status: 201, description: 'Retornar el json con los datos del template' })
  @Post()
  async executeTemplate(@Body() executeTemplateDto: ExecuteTemplateDto): Promise<any> {
    return this.executeTemplates.executeTemplate(executeTemplateDto.id_template, executeTemplateDto.type_template);
  }
}