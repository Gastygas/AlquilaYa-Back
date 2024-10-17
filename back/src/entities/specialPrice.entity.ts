import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Property } from "./property.entity";


@Entity("specialprice")
export class SpecialPrice{

    @PrimaryGeneratedColumn('uuid')
    id:string = uuid

    @Column()
    dateStart:Date

    @Column()
    dateEnd:Date

    @Column()
    specialPrice: number

    @ManyToOne(() => Property, property => property.specialprice)
    property: Property
}