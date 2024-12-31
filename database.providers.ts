
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'LeKhoa@123',
    database: 'job_portal',
    entities: [__dirname + '/../**/*.entities{.ts,.js}'],
    logging: true,
    synchronize: false, // Nên đặt `false` trong môi trường production
  });
  
  export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        return AppDataSource.initialize();
      },
    },
  ];
