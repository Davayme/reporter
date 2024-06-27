import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { Query } from '@prisma/client';
import { CreateQueryCommand, DeleteQueryCommand, UpdateQueryCommand } from 'src/queries/application/commands/query.comands';
import { CreateQueryDto } from 'src/queries/application/dtos/create-query.dto';
import { GetQueriesByServerIdService } from 'src/queries/application/services/get-queries-by-server.service';
import { CreateQueryService } from 'src/queries/application/services/create-query.service';
import { UpdateQueryDto } from 'src/queries/application/dtos/update-query.dto';
import { UpdateQueryService } from 'src/queries/application/services/update-query.service';
import { DeleteQueryService } from 'src/queries/application/services/delete-query.service';
import { GetQueries } from 'src/queries/application/services/getAll-query.service';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { PermissionsGuard } from 'src/auth/infrastructure/guards/permissions.guard';
import { Permissions } from 'src/auth/infrastructure/decorators/permissions.decorator';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('queries')
@Controller('queries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class QueryController {
    constructor(
        private readonly getQueries: GetQueries,
        private readonly getQueriesByServerIdService: GetQueriesByServerIdService,
        private readonly createQueryService: CreateQueryService,
        private readonly updateQueryService: UpdateQueryService,
        private readonly deleteQueryService: DeleteQueryService
    ) { }

    @ApiOperation({ summary: 'Obtener las consultas sql existentes' })
    @ApiResponse({ status: 200, description: 'Retornar el json de las con las consultas sql existentes' })
    @Get()
    async getAllQueries(): Promise<Query[]> {
        return this.getQueries.execute();
    }

    @ApiOperation({ summary: 'Obtener las consultas sql existentes de un determinado servidor' })
    @ApiResponse({ status: 200, description: 'Retornar el json de las con las consultas sql existentes de un determinado servidor' })
    @ApiParam({ name: 'serverId', description: 'El ID del servidor que se va a buscar. Debe ser un número entero positivo.', type: Number, required: true })
    @Get('server/:serverId')
    async getAllQueriesByServerId(@Param('serverId', ParseIntPipe) serverId: number): Promise<any[]> {
        return this.getQueriesByServerIdService.execute(serverId);
    }

    @ApiOperation({ summary: 'Crear una nueva consulta sql' })
    @ApiResponse({ status: 201, description: 'Retornar el json de la consulta sql creada' })
    @Permissions('create')
    @Roles('user', 'admin')
    @Post()
    async createQuery(@Body(new ValidationPipe()) createQueryDto: CreateQueryDto): Promise<Query> {
        const command = new CreateQueryCommand(createQueryDto);
        return this.createQueryService.execute(command);
    }


    @ApiOperation({ summary: 'Actualizar una consulta sql' })
    @ApiParam({
        name: 'id',
        description: 'El ID de la consulta SQL que se va a actualizar. Debe ser un número entero positivo.',
        type: Number,
        required: true
    })
    @ApiResponse({ status: 200, description: 'La consulta sql se actualizo correctamente' })
    @Patch(':id')
    async updateQuery(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateQueryDto: UpdateQueryDto): Promise<Query> {
        const command = new UpdateQueryCommand(id, updateQueryDto);
        return this.updateQueryService.execute(command);
    }

    @ApiOperation({ summary: 'Eliminar una consulta sql' })
    @ApiParam({
        name: 'id',
        description: 'El ID de la consulta SQL que se va a eliminar. Debe ser un número entero positivo.',
        type: Number,
        required: true
    })
    @ApiResponse({ status: 200, description: 'La consulta sql se elimino correctamente' })
    @Delete(':id')
    async deleteQuery(@Param('id', ParseIntPipe) id: number): Promise<Query> {
        const command = new DeleteQueryCommand(id);
        return this.deleteQueryService.execute(command);
    }

}
