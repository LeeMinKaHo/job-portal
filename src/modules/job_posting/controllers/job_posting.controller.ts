import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { job_posting_service } from '../services/job_posting_service';
import { job_posting } from 'src/database/entities/job_posting';
import { create_job_posting_dto } from '../dtos/create_job-posting_dto';
import { update_job_posting_dto } from '../dtos/update_job-posting_dto';
import { DeleteResult } from 'typeorm';

@Controller('job_posting')
export class job_posting_controller {
  // Correct token name
  // Inject the service into the controller's constructor
  constructor(private readonly job_posting_service: job_posting_service) {}

  @Get()
  async findAll(): Promise<job_posting[]> {
    // Call the service's findAll method
    console.log(this.job_posting_service);
    return await this.job_posting_service.findAll();
  }
  @Post()
  async create(
    @Body() create_job_posting_dto: create_job_posting_dto,
  ): Promise<job_posting> {
    return await this.job_posting_service.create(create_job_posting_dto);
  }
  @Patch()
  async update(
    @Body() update_job_posting_dto: update_job_posting_dto,
  ): Promise<job_posting | null> {
    const result = await this.job_posting_service.update(
      update_job_posting_dto,
    );

    if (!result) {
      throw new HttpException('Job posting not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      // Gọi service để thực hiện việc xóa
      const result = await this.job_posting_service.delete(id);

      if (result.affected === 0) {
        // Nếu không xóa được bản ghi (do không tìm thấy)
        throw new HttpException('Job posting not found', HttpStatus.NOT_FOUND);
      }

      // Trả về thông báo thành công
      return {
        message: `Job posting with ID ${id} has been deleted successfully.`,
      };
    } catch (error) {
      // Xử lý lỗi nếu có
      throw new HttpException(
        error.message || 'Failed to delete job posting',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
