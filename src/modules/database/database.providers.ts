import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'LeKhoa@123',
    database: 'job_portal',
    entities: ['dist/database/entities/*.js'], // Adjust as per environment
    logging: true,
    migrations: ["dist/database/migrations/*.js"],
    synchronize: false, // Nên đặt `false` trong môi trường production
  });
  


