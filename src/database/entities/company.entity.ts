import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("companies")
export class company{
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
    
}