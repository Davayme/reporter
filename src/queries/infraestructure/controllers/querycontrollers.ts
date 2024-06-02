import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { Query } from '@prisma/client';
import { CreateQueryCommand } from 'src/queries/application/commands/query.comands';
import { CreateQueryDto } from 'src/queries/application/dtos/create-query.dto';
import { GetQueriesByServerIdService } from 'src/queries/application/services/get-queries-by-server.service';
import { CreateQueryService } from 'src/queries/application/services/create-query.service';


@Controller('queries')
export class QueryController {
    constructor(
        private readonly getQueriesByServerIdService: GetQueriesByServerIdService,
        private readonly createQueryService: CreateQueryService
    ) { }

    @Get('server/:serverId')
    async getAllQueriesByServerId(@Param('serverId', ParseIntPipe) serverId: number): Promise<any[]> {
        return this.getQueriesByServerIdService.execute(serverId);
    }

    @Post()
    async createQuery(@Body(new ValidationPipe()) createQueryDto: CreateQueryDto): Promise<Query> {
        const command = new CreateQueryCommand(createQueryDto);
        return this.createQueryService.execute(command);
    }

}
