import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Property } from "./property.entity";


@Entity("specialprice")
export class SpecialPrice{

    @PrimaryGeneratedColumn('uuid')
    id:string = uuid

    @Column({nullable:false})
    dateStart:Date

    @Column({nullable:false})
    dateEnd:Date

    @Column({type:'int',nullable:false})
    specialPrice: number

    @ManyToOne(() => Property, property => property.specialprice)
    property: Property
}