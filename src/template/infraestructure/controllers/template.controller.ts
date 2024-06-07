import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CreateTemplateCommand, DeleteTemplateCommand, UpdateTemplateCommand } from 'src/template/aplication/commands/template.commands';
import { CreateTemplateDto } from 'src/template/aplication/dto/create-template.dto';
import { TemplateResponseDto } from 'src/template/aplication/dto/template-response.dto';
import { GetAllTemplateService } from 'src/template/aplication/services/getAll-template.service';
import { CreateTemplateService } from 'src/template/aplication/services/create-template.service';
import { UpdateTemplateService } from 'src/template/aplication/services/update-template.service';
import { UpdateTemplateDto } from 'src/template/aplication/dto/update-template.dto';
import { DeleteTemplateService } from 'src/template/aplication/services/delete-template.service';
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
    const command = new UpdateTemplateCommand(updateTemplateDto);
    return this.updateTemplateService.update(id_template, command);
  }

  @Delete(':id_template')
  async delete(@Param('id_template') id_template: number): Promise<void> {
    const command = new DeleteTemplateCommand(id_template);
    return this.deleteTemplateService.delete(command);
  }
}