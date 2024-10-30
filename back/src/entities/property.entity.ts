import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Booking } from './booking.entity';
import { SpecialPrice } from './specialPrice.entity';
import { User } from './user.entity';
import { Reviews } from './reviews.entity';

@Entity('property')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('varchar', { array: true, default: [] })
  photos: string[] | string;

  @Column({ type: 'varchar', nullable: false })
  propertyName: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  addressUrl: string;

  @Column({ type: 'varchar', nullable: false })
  bill: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ type: 'int', nullable: false })
  bedrooms: number;

  @Column({ type: 'int', nullable: false })
  bathrooms: number;

  @Column({ type: 'boolean', nullable: false })
  wifi: boolean;

  @Column({ type: 'boolean', nullable: false })
  petFriendly: boolean;

  @Column({ type: 'boolean', nullable: false })
  airConditioning: boolean;

  @Column({ type: 'boolean', nullable: false })
  heating: boolean;

  @Column({ type: 'boolean', nullable: false })
  pool: boolean;

  @Column({ type: 'boolean', nullable: false })
  parking: boolean;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', default: 'pending' })
  propertyStatus: 'pending' | 'approved' | 'cancelled' | 'maintenance';

  @Column({
    type: 'date',
    nullable: true,
    default: [],
    array: true,
  })
  disableDays: string[];

  @Column({ type: 'date', nullable: true, default: [], array: true })
  reservedDays: string[];

  @OneToMany(() => Booking, (booking) => booking.property)
  bookings: Booking[];

  @OneToMany(() => SpecialPrice, (specialPrice) => specialPrice.property)
  specialprice: SpecialPrice[];

  @ManyToOne(() => User, (user) => user.properties)
  user: User;

  @OneToMany(() => Reviews, (reviews) => reviews.property)
  reviews: Reviews[];
}
