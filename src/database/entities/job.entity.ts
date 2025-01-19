import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("jobs")
export class job {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:false,type:"varchar"})
  title: string;
  @Column({length:100,type:"varchar",default:"Thỏa thuận",nullable:false})
  salary: string;
  @Column({ type: 'int',default: 1})
  recruitment_quantity: string;
  @Column( {type:"text", nullable:false} )
  benefits: string;
  @Column({type:"text", nullable:false})
  job_description: string;
  @Column({type:"text", nullable:false})
  application_deadline: string;
  @Column({type:"boolean", nullable:false})
  is_Hidden:boolean
  @Column({type:"boolean", nullable:false})
  gender : boolean
  @Column({type:"int" , nullable:false})
  company_id:number
}
