"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        exceptionFactory: (err) => {
            const errors = err.map((error) => {
                return { property: error.property, constraints: error.constraints };
            });
            return new common_1.BadRequestException({
                alert: 'ERRORS!, please read carefully',
                error: errors
            });
        }
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Proyecto Final - AlquilaYa')
        .setDescription('Aplicación creada con Nest JS')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map