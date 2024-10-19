import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Booking } from './booking.entity';
@Entity('payments')
export class Payment {

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  
  @Column({nullable: false})
  method : string

  @Column({nullable: false , type: 'date'})
  date : Date

  @Column({nullable: false , type : "float"})
  amount : number

  @Column({nullable: false })
  paymentStatus : "completed" | "pending" | "failed" | "cancelled" | "refunded"

  @Column({nullable: false, type : "varchar" , length : 50})
  transactionId : string

  @OneToOne(() => Booking, (booking) => booking.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking' })
  booking: Booking;
}
