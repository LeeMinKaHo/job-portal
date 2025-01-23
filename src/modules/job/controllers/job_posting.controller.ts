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
  UseGuards,
} from '@nestjs/common';

import { jobService } from '../services/job.service';
import { job } from 'src/database/entities/job.entity';
import { create_job } from '../dtos/create_job.dto';
import { update_job } from '../dtos/update_job.dto';

import { Roles } from 'src/modules/auth/decorator/role.decorator';

import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Role } from 'src/modules/auth/enum/role.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('jobs')
export class jobController {
  // Correct token name
  // Inject the service into the controller's constructor
  constructor(private readonly job_posting_service: jobService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  async findAll(): Promise<job[]> {
    // Call the service's findAll method
    console.log(this.job_posting_service);
    return await this.job_posting_service.findAll();
  }

  @UseGuards(RolesGuard)
 
  @Post()
  async create(
    @Body() create_job_posting_dto: create_job,
  ): Promise<job> {
    
    return await this.job_posting_service.create(create_job_posting_dto);
  }
  @Patch()
  async update(
    @Body() update_job_posting_dto: update_job,
  ): Promise<job | null> {
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
