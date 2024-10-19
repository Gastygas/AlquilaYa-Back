"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDataSource = void 0;
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    autoloadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    logging: true,
    migrationsRun: true,
    synchronize: true,
    dropSchema: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
const connectDataSource = () => new typeorm_1.DataSource(config);
exports.connectDataSource = connectDataSource;
//# sourceMappingURL=typeorm.js.map