import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Payment } from 'src/entities/payment.entity'; // Ajusta las rutas si es necesario
import { Booking } from 'src/entities/booking.entity';
import { PropertyRepository } from '../property/property.repository';
import { UsersRepository } from '../users/users.repository';
import { MercadoPagoService } from '../mercadopago/mercadoPago.service';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';
import { isDateAvailable } from '../booking/utils/isDateAvailable';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly propertyRepository: PropertyRepository,
    private readonly userRepository: UsersRepository,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  
  async getAllPayments() {
    return await this.paymentRepository.find({relations:{booking:true}})
  }
  async createPaymentAndBooking(
    paymentId: string,
    newBooking: CreateBookingDto,
    userId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Obtener detalles del pago desde MercadoPago
      const data = await this.mercadoPagoService.getPaymentDetails(paymentId);

      // Validación de estado del pago
      if (data.status !== 'approved') {
        throw new BadRequestException('Payment not approved');
      }

      // Buscar usuario
      const user = await this.userRepository.getUserById(userId);
      if (!user) throw new BadRequestException('User Id not found');

      // Buscar propiedad
      const property = await this.propertyRepository.getPropertyById(newBooking.propertyId);
      if (!property) throw new BadRequestException('Property id not found');

      // Verificar disponibilidad de fechas
      if (
        !isDateAvailable(property, newBooking.dateStart) ||
        !isDateAvailable(property, newBooking.dateEnd)
      ) {
        throw new BadRequestException('The selected dates are not available.');
      }

      // Crear entidad de Payment
      const payment = queryRunner.manager.create(Payment, {
        transactionId: data.id,
        paymentStatus: data.status,
        method: data.payment_method.type,
        amount: data.transaction_amount,
        date: new Date(),
      });
      await queryRunner.manager.save(payment);

      // Crear entidad de Booking
      const booking = queryRunner.manager.create(Booking, {
        ...newBooking,
        user: user,
        property: property,
        payment: payment,
      });
      const savedBooking = await queryRunner.manager.save(booking);

      // Actualizar disableDays de la propiedad
      await this.propertyRepository.addDisablesDayRepository(
        property.id,
        { dateStart: newBooking.dateStart, dateEnd: newBooking.dateEnd },
        // queryRunner.manager,
      );

      await queryRunner.commitTransaction();

      return {
        success: 'Payment and booking have been created',
        booking: {
          id: savedBooking.id,
          user: { id: user.id },
          property: { id: property.id },
          payment: { id: payment.id },
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
