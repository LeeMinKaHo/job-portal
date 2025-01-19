import { job } from "src/database/entities/job.entity";
import { DataSource } from "typeorm";
export const job_posting_provider=[
    {
        provide: 'JOB_POSTING_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(job),
        inject: ['DATA_SOURCE'],
    }
]