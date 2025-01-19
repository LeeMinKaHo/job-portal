import { company } from "src/database/entities/company.entity";
import { DataSource } from "typeorm";

export const company_provider=[
    {
         provide: 'COMPANY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(company),
        inject: ['DATA_SOURCE'],
    }
]