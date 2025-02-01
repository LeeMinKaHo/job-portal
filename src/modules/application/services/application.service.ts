import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Application } from "src/database/entities/application.entity";
import { Repository } from "typeorm";
import { CreateApplication } from "../dto/create-application.dto";
import { JobService as JobService } from "src/modules/job/services/job.service";
@Injectable()
export class ApplicationService{
    constructor(
        @InjectRepository(Application)
        private applicationsRepository : Repository<Application>,
        private jobService : JobService
    ){}

    async create( createApplication:CreateApplication ) : Promise<Application>{
        const {jobID} : { jobID: number } = createApplication
        const job =  this.jobService.findOne(jobID)
        if( job === null ){
            throw new HttpException("Job not found", HttpStatus.NOT_FOUND); 
        }
        else {
            const newApplication = this.applicationsRepository.create()
            newApplication.cover_letter = createApplication.coverLetter
            newApplication.job_id= jobID
            return await this.applicationsRepository.save(newApplication)

        }
    }
}