import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/database/entities/application.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateApplication } from '../dto/create-application.dto';
import { JobService as JobService } from 'src/modules/job/services/job.service';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private jobService: JobService,
    private dataSource: DataSource,
  ) {}

  async create(
    createApplication: CreateApplication,
    file: Express.Multer.File,
  ): Promise<Application> {
    const { jobID }: { jobID: number } = createApplication;
    const job = await this.jobService.findOne(jobID);

    if (job === null) {
      throw new HttpException('Job not found', HttpStatus.NOT_FOUND);

    } else {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newApplication = this.applicationsRepository.create();
        newApplication.cover_letter = createApplication.coverLetter;
        newApplication.job_id = jobID;
        newApplication.resume_url="sdjsakdas"
        
        await queryRunner.manager.save(newApplication);
        const subFolderDir = `applications/${newApplication.id}`;
        const folderDir = path.join('public', subFolderDir);
        
        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir, { recursive: true });
        }

        // Định nghĩa đường dẫn file
        const filePath = path.join(folderDir, file.originalname);
        fs.writeFileSync(filePath, file.buffer);


        const imgUrl = `${process.env.HOST}/${subFolderDir}/${file.originalname}`;
        newApplication.resume_url = imgUrl;
        await queryRunner.manager.save(newApplication);
        // Commit transaction
        await queryRunner.commitTransaction();
        return newApplication;

      } catch (e) {
        console.error(e);
        await queryRunner.rollbackTransaction();

      } finally {
        await queryRunner.release();
      }
    }
  }
}
