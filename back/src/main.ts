import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 //Manejo de errores
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
  
  //* Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Proyecto Final - AlquilaYa')
    .setDescription('Aplicación creada con Nest JS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
  app.enableCors(corsOptions);


  await app.listen(3001);
}
bootstrap();
