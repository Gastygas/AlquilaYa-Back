import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Notification } from './notification.entity';
import { Reviews } from './reviews.entity';
import { Booking } from './booking.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'varchar', length: 30 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 30 })
  surname: string;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 50 })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  dni: string;

  @Column({ default: false, nullable: true })
  isAdmin: boolean;

  @Column({ nullable: false, type: 'varchar', length: 30 })
  country: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  adress: string;

  @Column({ nullable: false, type: 'varchar', length: 30 })
  phone: string;

//  PREGUNTAR A GUSTAVO @Column({ nullable: true })
//   favorite_properties: string[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
