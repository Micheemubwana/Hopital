import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/hopital-patient');
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  
  await app.listen(process.env.PORT || 3050);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
