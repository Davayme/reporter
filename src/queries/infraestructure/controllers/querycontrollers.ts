import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Query } from '@prisma/client';
import { CreateQueryCommand, DeleteQueryCommand, UpdateQueryCommand } from 'src/queries/application/commands/query.comands';
import { CreateQueryDto } from 'src/queries/application/dtos/create-query.dto';
import { GetQueriesByServerIdService } from 'src/queries/application/services/get-queries-by-server.service';
import { CreateQueryService } from 'src/queries/application/services/create-query.service';
import { UpdateQueryDto } from 'src/queries/application/dtos/update-query.dto';
import { UpdateQueryService } from 'src/queries/application/services/update-query.service';
import { DeleteQueryService } from 'src/queries/application/services/delete-query.service';
import { GetQueries } from 'src/queries/application/services/getAll-query.service';

@Controller('queries')
export class QueryController {
    constructor(
        private readonly getQueries: GetQueries,
        private readonly getQueriesByServerIdService: GetQueriesByServerIdService,
        private readonly createQueryService: CreateQueryService,
        private readonly updateQueryService: UpdateQueryService,
        private readonly deleteQueryService: DeleteQueryService
    ) { }

    @Get()
    async getAllQueries(): Promise<Query[]> {
        return this.getQueries.execute();
    }

    @Get('server/:serverId')
    async getAllQueriesByServerId(@Param('serverId', ParseIntPipe) serverId: number): Promise<any[]> {
        return this.getQueriesByServerIdService.execute(serverId);
    }

    @Post()
    async createQuery(@Body(new ValidationPipe()) createQueryDto: CreateQueryDto): Promise<Query> {
        const command = new CreateQueryCommand(createQueryDto);
        return this.createQueryService.execute(command);
    }
    @Patch(':id')
    async updateQuery(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateQueryDto: UpdateQueryDto): Promise<Query> {
      const command = new UpdateQueryCommand(id, updateQueryDto);
      return this.updateQueryService.execute(command);
    }
  
    @Delete(':id')
    async deleteQuery(@Param('id', ParseIntPipe) id: number): Promise<Query> {
      const command = new DeleteQueryCommand(id);
      return this.deleteQueryService.execute(command);
    }

}
