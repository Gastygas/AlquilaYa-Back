import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './modules/booking/booking.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [BookingModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}