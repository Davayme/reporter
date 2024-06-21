import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CreateTemplateCommand, DeleteTemplateCommand, UpdateTemplateCommand } from 'src/template/application/commands/template.commands';
import { CreateTemplateDto } from 'src/template/application/dto/create-template.dto';
import { TemplateResponseDto } from 'src/template/application/dto/template-response.dto';
import { GetAllTemplateService } from 'src/template/application/services/getAll-template.service';
import { CreateTemplateService } from 'src/template/application/services/create-template.service';
import { UpdateTemplateService } from 'src/template/application/services/update-template.service';
import { UpdateTemplateDto } from 'src/template/application/dto/update-template.dto';
import { DeleteTemplateService } from 'src/template/application/services/delete-template.service';
@Controller('templates')
export class TemplateController {
  constructor(private readonly getAllTemplate: GetAllTemplateService
    ,private readonly createTemplateService: CreateTemplateService
    ,private readonly updateTemplateService: UpdateTemplateService
    ,private readonly deleteTemplateService: DeleteTemplateService
  ) { }

  @Get()
  async findAll(): Promise<TemplateResponseDto[]> {
    return this.getAllTemplate.findAll();
  }

  @Post()
  async create(@Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto): Promise<any> {
    const command = new CreateTemplateCommand(createTemplateDto);
    return this.createTemplateService.create(command);
  }

  @Patch(':id_template')
  async update(@Param('id_template') id_template: number, @Body(new ValidationPipe()) updateTemplateDto: UpdateTemplateDto): Promise<any> {
    const command = new UpdateTemplateCommand(id_template, updateTemplateDto);
    return this.updateTemplateService.update(command);
  }

  @Delete(':id_template')
  async delete(@Param('id_template') id_template: number): Promise<void> {
    const command = new DeleteTemplateCommand(id_template);
    return this.deleteTemplateService.delete(command);
  }
}