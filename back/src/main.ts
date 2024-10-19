import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    exceptionFactory:(err) => {
      const errors = err.map((error) => {
        return {property: error.property, constraints: error.constraints}
      })
    
    return new BadRequestException({
      alert:'ERRORS!, please read carefully',
      error: errors
    })
    }
  }))

  await app.listen(3000);
}
bootstrap();


