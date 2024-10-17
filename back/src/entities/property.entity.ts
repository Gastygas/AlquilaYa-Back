import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';
<<<<<<< HEAD
import { Booking } from "./booking.entity";
=======
import { SpecialPrice } from "./specialPrice.entity";
>>>>>>> 2167a022c36d8f590d71b85cbe2aa7a5ef144054

@Entity("property")
export class Property{
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid();

    @Column({nullable: false})
    photos:string[];

    @Column()
    disableDays:Date[];

    @Column({type: 'varchar',nullable: false})
    adress:string;

    @Column({type: 'varchar',nullable: false})
    adressUrl:string;

    @Column({type: 'varchar',nullable: false})
    bill:string;

    @Column({type: 'varchar',nullable: false})
    country:string;

    @Column({type: 'varchar',nullable: false})
    city:string;

    @Column({type:'int',nullable: false})
    price:number;

    @Column({type:'int',nullable: false})
    capacity:number;

    @Column({type:'int',nullable: false})
    bedrooms:number;

    @Column({type:'int',nullable: false})
    bathrooms:number;

    @Column({type:'boolean',nullable: false})
    wifi:boolean;
    
    @Column({type:'boolean',nullable: false})
    petFriendly:boolean;

    @Column({type:'boolean',nullable: false})
    airConditioning: boolean;

    @Column({type:'boolean',nullable: false})
    heating:boolean;

    @Column({type:'boolean',nullable: false})
    pool:boolean;

    @Column({type:'boolean',nullable: false})
    parking:boolean;

    @Column({type: 'varchar'})
    description:string;

    @Column({type: 'varchar'})
    propertyStatus:string;

<<<<<<< HEAD
    @OneToMany(() => Booking, booking => booking.property)
    bookings: Booking[]
=======
    @OneToMany(() => SpecialPrice, specialPrice => specialPrice.property)
    specialprice: SpecialPrice[];

>>>>>>> 2167a022c36d8f590d71b85cbe2aa7a5ef144054
}
