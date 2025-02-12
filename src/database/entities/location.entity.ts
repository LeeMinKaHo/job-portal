import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Job } from "./job.entity"

@Entity("locations")
export class Location {
    @PrimaryGeneratedColumn()
    id : number
    @Column({nullable:false})
    name : string

    @OneToMany( () => Job , (Job) => Job.location )
    jobs:Job[]
}