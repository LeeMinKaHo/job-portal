import { job_posting } from "src/database/entities/job_posting";
import { DataSource } from "typeorm";
export const job_posting_provider=[
    {
        provide: 'JOB_POSTING_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(job_posting),
        inject: ['DATA_SOURCE'],
    }
]