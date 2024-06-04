import { Body, Controller, HttpException, HttpStatus, Post, ValidationPipe } from "@nestjs/common";
import { ExecuteQueryDto } from "src/execute-queries/application/dtos/execute-query.dto";
import { ExecuteQueryService } from "src/execute-queries/application/services/execute-query.service";

@Controller('execute-queries')
export class ExecuteQueryController {
  constructor(private readonly executeQueryService: ExecuteQueryService) {}

  @Post()
  async executeQuery(@Body(new ValidationPipe()) executeQueryDto: ExecuteQueryDto): Promise<any> {
    try {
      return await this.executeQueryService.execute(executeQueryDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}