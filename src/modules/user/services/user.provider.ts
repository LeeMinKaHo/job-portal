import { User } from "src/database/entities/user.entity";
import { DataSource } from "typeorm";

export const user_provider = [{
    provide:"USER_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
}
]