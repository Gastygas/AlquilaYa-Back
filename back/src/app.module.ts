import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './modules/property/property.module';
import typeormConfig from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    PropertyModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
