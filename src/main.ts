import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades que no están en el DTO
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no permitidas
    transform: true, // Transforma los datos a los tipos esperados
    errorHttpStatusCode: 400,
    exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map(error => ({
          field: error.property,
          errors: error.constraints ? Object.values(error.constraints) : ['Unspecified error'],
        })),
      );
    },
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
