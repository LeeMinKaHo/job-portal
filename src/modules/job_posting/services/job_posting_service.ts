import { Injectable, Inject, Body } from "@nestjs/common";
import { job_posting } from "src/database/entities/job_posting";
import { DeleteResult, Repository } from "typeorm";
import { create_job_posting_dto } from "../dtos/create_job-posting_dto";
import { update_job_posting_dto } from "../dtos/update_job-posting_dto";


@Injectable()
export class job_posting_service {
  constructor(
    @Inject('JOB_POSTING_REPOSITORY')
    private job_posting_repository: Repository<job_posting>,
  ) {}

  async findAll(): Promise<job_posting[]> {
    return await this.job_posting_repository.find();
  } 
  async create(createJobPostingDto: create_job_posting_dto): Promise<job_posting> {
    console.log(createJobPostingDto)
    const newJobPosting = this.job_posting_repository.create();
    Object.assign(newJobPosting, createJobPostingDto);
    await this.job_posting_repository.save(newJobPosting)
    return newJobPosting;
  }
  
  async findOne(id: number): Promise<job_posting | null> {
    const jobPosting = await this.job_posting_repository.findOne({ where: { id: id } });
    return jobPosting || null; // Trả về null nếu không tìm thấy
  }
  
  async update(update_job_posting_dto: update_job_posting_dto): Promise<job_posting | null> {
    // Tìm bản ghi với ID được cung cấp
    const existingJob = await this.findOne(update_job_posting_dto.id);
  
    if (!existingJob) {
      // Nếu không tìm thấy, trả về null hoặc ném lỗi
      throw new Error(`Job posting with ID ${update_job_posting_dto.id} not found`);
    }
  
    // Cập nhật dữ liệu mới vào bản ghi tìm thấy
    Object.assign(existingJob, update_job_posting_dto);
  
    // Lưu thay đổi
    return await this.job_posting_repository.save(existingJob);
  }  

  async delete(id: number): Promise<DeleteResult> {
    // Tìm và xóa bản ghi theo ID
    const result = await this.job_posting_repository.update(id,{ is_Hidden:true});
    return result;
  }
}