import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reviews } from './reviews.entity';
import { Booking } from './booking.entity';
import { Property } from './property.entity';

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

  @Column({ nullable: false, type: 'varchar', select: false })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  dni: string;

  @Column({ default: false, nullable: true })
  isAdmin: boolean;

  @Column({ default: true, nullable: true })
  status: boolean;

  @Column({ nullable: false, type: 'varchar', length: 30 })
  country: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  address: string;

  @Column({ nullable: false, type: 'varchar', length: 30 })
  phone: string;

  @Column('varchar', { array: true, default:[] })
  favoriteProperties: string[];

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];
}
