import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database.module';
import { job_listing_module } from './modules/job_posting/job_posting.module';

@Module({
  imports: [ ConfigModule.forRoot(),DatabaseModule,job_listing_module],
  controllers: [AppController],
  providers: [AppService],
  exports:[DatabaseModule]
})
export class AppModule {}
