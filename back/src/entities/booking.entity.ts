import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Property } from './property.entity';
import { Payment } from './payment.entity';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({type : "date" , nullable :   false})
  dateStart : Date;

  @Column({type : "date" , nullable :   false})
  dateEnd : Date;

  @Column()
  bookingStatus : boolean;

  @ManyToOne(() => User, property => property.bookings)
  user: User

  @ManyToOne(() => Property, property => property.bookings)
  property: Property
  
  @OneToOne(() => Payment, payment => payment.booking)
  payment: Payment
}
