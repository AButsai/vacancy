import { initializeFirebaseApp } from '@entities/upload/config/firebase.config';
import { UploadDto } from '@entities/upload/dto/upload.dto';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

initializeFirebaseApp();

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vacancy API')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addServer(process.env.BASE_URL)
    .addBearerAuth()
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [UploadDto],
  });
  SwaggerModule.setup('/api/docs', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
