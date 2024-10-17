import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./user.entity";
@Entity("notifications")
export class Notification {

@PrimaryGeneratedColumn("uuid")
id: string = uuid();

@Column({ nullable: false, type: 'date', length: 50 })
date_time: Date;

@Column({ nullable: false, type: 'varchar', length: 200 })
message: string;

@ManyToOne(() => User, user => user.notifications)
user: User

}