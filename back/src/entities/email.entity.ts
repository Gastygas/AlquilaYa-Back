import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./user.entity";
@Entity("notifications")
export class Email {

@PrimaryGeneratedColumn("uuid")
id: string = uuid();

@Column({ nullable: false, type: 'varchar', length: 200 })
email: string;

@Column({ nullable: false})
createdAt: string;

}