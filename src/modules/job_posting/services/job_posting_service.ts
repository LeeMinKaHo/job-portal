import { Injectable, Inject } from "@nestjs/common";
import { job_posting } from "src/database/entities/job_posting";
import { Repository } from "typeorm";


@Injectable()
export class job_posting_service {
  constructor(
    @Inject('JOB_POSTING_REPOSITORY')
    private job_posting_repository: Repository<job_posting>,
  ) {}

  async findAll(): Promise<job_posting[]> {
    return await this.job_posting_repository.find();
  }
}