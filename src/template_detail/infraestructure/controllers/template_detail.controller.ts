import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTemplateDetailsCommand, DeleteTemplateDetailCommand, UpdateTemplateDetailsCommand } from 'src/template_detail/applicaction/commands/template-detail.command';
import { CreateTemplateDetailsDto } from 'src/template_detail/applicaction/dtos/create-template-detail.dto';
import { DeleteTemplateDetailDto } from 'src/template_detail/applicaction/dtos/delete-template-detail.dto';
import { UpdateTemplateDetailsDto } from 'src/template_detail/applicaction/dtos/update-template-detail.dto';
import { CreateTemplateDetailsService } from 'src/template_detail/applicaction/services/create-template-detail.service';
import { DeleteTemplateDetailService } from 'src/template_detail/applicaction/services/delete-template-detail.service';
import { UpdateTemplateDetailsService } from 'src/template_detail/applicaction/services/update-template-details.service';

@ApiTags('template-detail')
@Controller('template-detail')
@ApiBearerAuth()
export class TemplateDetailController {
  constructor(
    private readonly createTemplateDetailsService: CreateTemplateDetailsService,
    private readonly updateTemplateDetailsService: UpdateTemplateDetailsService,
    private readonly deleteTemplateDetailService: DeleteTemplateDetailService
  ) { }

  @ApiOperation({ summary: 'Crear un nuevo detalle de plantilla' })
  @ApiResponse({ status: 201, description: 'Retornar el json del detalle de plantilla creado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'templateId', 
    description: 'Id de la plantilla a la que pertenece el detalle',
   type: Number,
   required: true})
  @Post(':templateId')
  async create(
    @Param('templateId', ParseIntPipe) templateId: number,
    @Body() createTemplateDetailsDto: CreateTemplateDetailsDto
  ) {
    const command = new CreateTemplateDetailsCommand(createTemplateDetailsDto.templateDetails, templateId);
    return this.createTemplateDetailsService.create(command);
  }

  @ApiOperation({ summary: 'Actualizar un detalle de plantilla' })
  @ApiResponse({ status: 200, description: 'Detalle de plantilla actualizado correctamente' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch()
  async updateTemplateDetails(
    @Body() updateTemplateDetailsDto: UpdateTemplateDetailsDto
  ) {
    const command = new UpdateTemplateDetailsCommand(updateTemplateDetailsDto.templateDetails);
    return this.updateTemplateDetailsService.update(command);
  }

  @ApiOperation({ summary: 'Eliminar un detalle de plantilla' })
  @ApiResponse({ status: 200, description: 'Detalle de plantilla eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete()
  async deleteTemplateDetails(
    @Body() deleteTemplateDetailDto: DeleteTemplateDetailDto
  ) {
    const command = new DeleteTemplateDetailCommand(deleteTemplateDetailDto.id_details);
    return this.deleteTemplateDetailService.delete(command);
  }
}
