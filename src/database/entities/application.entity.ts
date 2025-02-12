import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity("applications")
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: true })
    cover_letter: string;

    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    create_at: Date;

    @Column({ type: "varchar", nullable: true    })
    resume_url: string;

    @Column({ type: "varchar", default: "PENDING" })
    status: string;

    @Column({ type: "boolean", default: true })
    active: boolean;

    @Column({type:"int"})
    job_id:number

    @ManyToOne(() => Job, (job) => job.applications)
    @JoinColumn({ name: "job_id" })
    job: Job;
}
