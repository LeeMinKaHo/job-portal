import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from './application.entity';
import { Company } from './company.entity';

@Entity("jobs")
export class Job {
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


  @OneToMany(() => Application ,(application) => application.job)
  applications : Application[]

  @ManyToOne(() => Company ,(company) => company.jobs)
  @JoinColumn({ name: "company_id" })
  company:Company
}
