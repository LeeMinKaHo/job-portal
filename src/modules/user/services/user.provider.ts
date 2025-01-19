import { user } from "src/database/entities/user.entity";
import { DataSource } from "typeorm";

export const user_provider = [{
    provide:"USER_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(user),
    inject: ['DATA_SOURCE'],
}
]