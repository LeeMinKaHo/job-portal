import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { CreateApplication } from '../dto/create-application.dto';
import { Application } from 'src/database/entities/application.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationService: ApplicationService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createApplication: CreateApplication,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'application/pdf' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Application> {
    console.log(createApplication)
    return await this.applicationService.create(createApplication , file);
  }
}
