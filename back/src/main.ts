import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Manejo de errores
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (err) => {
        const errors = err.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });

        return new BadRequestException({
          alert: 'ERRORS!, please read carefully',
          error: errors,
        });
      },
    }),
  );

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
  };

  app.enableCors({
    origin: '*', // Permite cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permite envío de cookies si es necesario
  });

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors(); // Permite CORS si es necesario
    await app.listen(3002);
  }
  bootstrap();

  //   app.enableCors({
  //     origin: 'https://alquilaya.vercel.app',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  //     credentials: true,  // Permite todas las solicitudes de origen
  // });

  await app.listen(3001);
}
bootstrap();
