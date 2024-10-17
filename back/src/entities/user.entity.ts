import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  @Column({nullable: true})
  favorite_properties:string[]
}
