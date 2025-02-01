import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './modules/job/job.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { authModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Company } from './database/entities/company.entity';
import { Job } from './database/entities/job.entity';
import { Application } from './database/entities/application.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'LeKhoa@123',
      database: 'job_portal',
      entities: [User , Company , Job , Application],
      synchronize: false,
    }),
    JobModule,
    CompanyModule,
    UserModule,
    authModule,
    JwtModule.register({})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
