import { Injectable, Inject, Body } from '@nestjs/common';
import { Job } from 'src/database/entities/job.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateJob } from '../dtos/create-job.dto';
import { UpdateJob } from '../dtos/update-job.dto';
import { User } from 'src/database/entities/user.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FillterJobDto } from '../dtos/fillter-job.dto';
import { Company } from 'src/database/entities/company.entity';
import { CompanyService } from 'src/modules/company/services/company.service';
import { CurrentUser } from 'src/modules/auth/decorator/currentUser.decorator';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private companyService : CompanyService
  ) {}

  async findAll(paginationDto: PaginationDto , fillterJobDto : FillterJobDto): Promise<[Job[],number]> {
    const { offset, limit } = paginationDto;
    const { title, locationId, fieldId } = fillterJobDto;
    
    const query = this.jobsRepository.createQueryBuilder('jobs')
        .take(limit)
        .skip(offset)
        .leftJoinAndSelect("jobs.company","company")
    
    // Chỉ thêm điều kiện nếu name có giá trị
    if (title) {
        query.where("jobs.title LIKE :title", { title: `%${title}%` });
    }
    
    // Nếu bạn cũng muốn lọc theo locationID và fieldID, bạn có thể thêm các điều kiện tương tự
    if (locationId) {
        query.andWhere("jobs.locationID = :locationID", { locationId });
    }
    
    if (fieldId) {
        query.andWhere("jobs.fieldID = :fieldID", { fieldId });
    }
    
    return query.getManyAndCount();
  }
  async create(
    createJobPostingDto: CreateJob,
    CurrentUser: User,
  ): Promise<Job> {
    const newJobPosting = this.jobsRepository.create();
    newJobPosting.company_id = CurrentUser.id;
    Object.assign(newJobPosting, createJobPostingDto);
    await this.jobsRepository.save(newJobPosting);
    return newJobPosting;
  }

  async findOne(id: number): Promise<Job | null> {
    const jobPosting: Job = await this.jobsRepository.findOne({
      where: {id },
      relations: ["company"]
    });
    return jobPosting || null; // Trả về null nếu không tìm thấy
  }

  async update(updateJobDto: UpdateJob , currentUser : User): Promise<Job | null> {  
    // Tìm bản ghi với ID được cung cấp
    const existingJob: Job = await this.findOne(updateJobDto.id);
    if (!existingJob) {
      // Nếu không tìm thấy, trả về null hoặc ném lỗi
      throw new Error(
        `Job posting with ID ${updateJobDto.id} not found`,
      );
    }
    const comapny : Company = await this.companyService.findOneByUserID(currentUser.id)
    console.log(currentUser.id,comapny , existingJob)
    if (comapny.id !== existingJob.company_id)
      throw new Error(
        `You are not allow to access other job`,
      );
    // Cập nhật dữ liệu mới vào bản ghi tìm thấy
    Object.assign(existingJob, updateJobDto);

    // Lưu thay đổi
    return await this.jobsRepository.save(existingJob);
  }

  async delete(id: number): Promise<DeleteResult> {
    // Tìm và xóa bản ghi theo ID
    const result = await this.jobsRepository.update(id, {
      is_Hidden: true,
    });
    return result;
  }
}
