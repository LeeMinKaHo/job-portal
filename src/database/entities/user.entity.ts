import { Role } from "src/modules/auth/enum/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class user{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    gmail:string
    @Column()
    password:string
    @Column()
    active:boolean
    @Column()
    role:Role
}