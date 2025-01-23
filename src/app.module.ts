import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/modules/database/database.module';
import { jobModule } from './modules/job/job.module';
import { company_module } from './modules/company/company.module';
import { user_module } from './modules/user/user.module';
import { authModule } from './modules/auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot(),DatabaseModule,jobModule , company_module , user_module,authModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[DatabaseModule]
})
export class AppModule {}
