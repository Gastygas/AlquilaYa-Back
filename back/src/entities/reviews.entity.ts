import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./user.entity";


@Entity()
export class Reviews {

    @PrimaryGeneratedColumn("uuid")
    id:string = uuid;

    @Column({nullable:false,})
    date:Date;

    @Column({nullable:true,default:'none'})
    description:string

    @Column({nullable:false,default:1})
    stars:number

    @Column({default:true})
    status: boolean

    @ManyToOne(() => User,user => user.reviews)
    user: User

}