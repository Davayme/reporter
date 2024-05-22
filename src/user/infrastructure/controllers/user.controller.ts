import { Controller, Post, Body, ValidationPipe, UseFilters } from '@nestjs/common';
import { UpdateUserService } from 'src/user/application/services/update-user.service';
import { UpdateUserCommand } from 'src/user/application/commands/user.command';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { UpdateUserDto } from 'src/user/application/dtos/update-user.dto';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly updateUserService: UpdateUserService
  ) {}

  @Post('edit')
  async update(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(updateUserDto.username, updateUserDto);
    await this.updateUserService.execute(command);
  }
}
