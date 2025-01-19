import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/modules/database/database.module';
import { job_listing_module } from './modules/job/job_posting.module';
import { company_module } from './modules/company/company.module';
import { user_module } from './modules/user/user.module';
import { authModule } from './modules/auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot(),DatabaseModule,job_listing_module , company_module , user_module,authModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[DatabaseModule]
})
export class AppModule {}
