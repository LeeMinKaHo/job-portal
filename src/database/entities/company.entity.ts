import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Job } from "./job.entity"
import { User } from "./user.entity"

@Entity("companies")
export class Company{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    tax_code:string
    @Column()
    field_id:number
    @Column()
    address:string
    @Column()
    location:number
    @Column()
    img_url:string
    @Column()
    userId:number

    @OneToMany( () => Job , (job) => job.company)
    jobs:Job[]

    @OneToOne(() => User)
    @JoinColumn()
    user : User
}