import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Property } from './property.entity';

@Entity('specialprice')
export class SpecialPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid;

  @Column({
    default: new Date(),
    type: 'date',
  })
  dateStart: Date;

  @Column({
    default: new Date(),
    type: 'date',
  })
  dateEnd: Date;

  @Column({ type: 'int', nullable: false })
  specialPrice: number;

  @ManyToOne(() => Property, (property) => property.specialprice)
  property: Property;
}
