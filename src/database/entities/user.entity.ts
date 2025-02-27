import { Role } from "src/modules/auth/enum/role.enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Exclude } from "class-transformer";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    gmail:string
    @Column()
    @Exclude()
    password:string
    @Column ({default:true} )
    active:boolean
    @Column()
    role:Role
    @Column()
    refresh_token:string

   
}