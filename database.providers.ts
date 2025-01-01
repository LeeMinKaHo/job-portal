
import { job_posting } from 'src/database/entities/job_posting';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'LeKhoa@123',
    database: 'job_portal',
    entities: [job_posting],
    logging: true,
    migrations: ["dist/src/database/migrations/*.js"],
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

