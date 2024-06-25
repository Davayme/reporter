import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API proyecto reporteador')
    .setDescription('Proyecto de la materia Patrones de software')
    .addTag('admin', 'Aquí va la descripción detallada del tag admin')
    .addTag('menu', 'Aquí va la descripción detallada del tag menu')
    .addTag('auth', 'Aquí va la descripción detallada del tag auth')
    .addTag('servers', 'Endpoints para la gestión de servidores')
    .addTag('queries', 'Endpoints para la gestión de consultas SQL')
    .addTag('generateTemplates', 'Endpoints para la obtencion de datos de las plantillas')
    .addTag('templates', 'Endpoints para la gestión de plantillas')
    .addTag('template-detail', 'Endpoints para la gestión de detalles de plantillas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
