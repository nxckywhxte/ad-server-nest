import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1/');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ASOI NestJS Backend Server')
    .setVersion('1.0')
    .setDescription('NestJS backend server for ASOI Automation Department')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDoc);

  await app.listen(8080);
}

bootstrap();
