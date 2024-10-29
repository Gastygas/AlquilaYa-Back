import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './modules/property/property.module';
import { SpecialPriceModule } from './modules/special-price/special-price.module';
import typeormConfig from './config/typeOrm';
import { AuthModule } from './modules/auth/auth.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './modules/email/email.module';
import { MercadopagoModule } from './modules/mercadopago/mercadoPago.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { BookingModule } from './modules/booking/booking.module';
import { GatewayModule } from './modules/websockets/websocket.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    GatewayModule,
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    EmailModule,
    AuthModule,
    PropertyModule,
    SpecialPriceModule,
    FileUploadModule,
    UsersModule,
    MercadopagoModule,
    PaymentsModule,
    BookingModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
