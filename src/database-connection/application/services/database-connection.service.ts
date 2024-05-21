import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateDatabaseConnectionDto } from '../../infrastructure/dto/create-database-connection.dto';
import { UpdateDatabaseConnectionDto } from '../../infrastructure/dto/update-database-connection.dto';

@Injectable()
export class DatabaseConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDatabaseConnectionDto: CreateDatabaseConnectionDto) {
    return this.prisma.databaseConnection.create({
      data: createDatabaseConnectionDto,
    });
  }

  findAll() {
    return this.prisma.databaseConnection.findMany();
  }

  findOne(id: number) {
    return this.prisma.databaseConnection.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDatabaseConnectionDto: UpdateDatabaseConnectionDto) {
    return this.prisma.databaseConnection.update({
      where: { id },
      data: updateDatabaseConnectionDto,
    });
  }

  remove(id: number) {
    return this.prisma.databaseConnection.delete({
      where: { id },
    });
  }
}
