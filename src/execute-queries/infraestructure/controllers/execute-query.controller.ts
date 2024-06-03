import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ExecuteQueryDto } from "src/execute-queries/application/dtos/execute-query.dto";
import { ExecuteQueryService } from "src/execute-queries/application/services/execute-query.service";

@Controller('execute-queries')
export class ExecuteQueryController {
  constructor(private readonly executeQueryService: ExecuteQueryService) {}

  @Post()
  async executeQuery(@Body(new ValidationPipe()) executeQueryDto: ExecuteQueryDto): Promise<any> {
    return this.executeQueryService.execute(executeQueryDto);
  }
}