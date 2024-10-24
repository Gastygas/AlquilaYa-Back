import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Property } from './property.entity';
import { Payment } from './payment.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({nullable:false})
  dateStart : string;

  @Column({nullable:false})
  dateEnd : string;

  @Column({default: true})
  bookingStatus: boolean;

  @ManyToOne(() => User, property => property.bookings,{nullable:false})
  user: User

  @ManyToOne(() => Property, property => property.bookings,{nullable:false})
  property: Property
  
  @OneToOne(() => Payment, payment => payment.booking)
  payment: Payment
}
