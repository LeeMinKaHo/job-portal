import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class job_posting {
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
}
