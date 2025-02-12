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
  Query,
  UseGuards,
} from '@nestjs/common';

import { JobService } from '../services/job.service';
import { Job } from 'src/database/entities/job.entity';
import { CreateJob } from '../dtos/create-job.dto';
import { UpdateJob } from '../dtos/update-job.dto';

import { Roles } from 'src/modules/auth/decorator/role.decorator';

import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Role } from 'src/modules/auth/enum/role.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CurrentUser } from 'src/modules/auth/decorator/currentUser.decorator';
import { User } from 'src/database/entities/user.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationMetaDataDto } from 'src/shared/dto/pagination-medata.dto';
import { PageDto } from 'src/shared/dto/page.dto';
import { FillterJobDto } from '../dtos/fillter-job.dto';
@Controller('jobs')
export class jobController {
  // Correct token name
  // Inject the service into the controller's constructor
  constructor(private readonly jobsService: JobService) {}

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() fillterJobDto: FillterJobDto,
  ): Promise<PageDto> {
    const [data, totalItem] = await this.jobsService.findAll(
      paginationDto,
      fillterJobDto,
    );
    return new PageDto(
      data,
      new PaginationMetaDataDto(totalItem, paginationDto),
    );
  }

  @Roles(Role.EMPLOYER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() createJobDto: CreateJob,
    @CurrentUser() current_user: User,
  ): Promise<Job> {
    return await this.jobsService.create(createJobDto, current_user);
  }

  @Patch()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.EMPLOYER)
  async update(
    @Body() update_job_posting_dto: UpdateJob,
    @CurrentUser() currentUser: User,
  ): Promise<Job | null> {
    const result = await this.jobsService.update(
      update_job_posting_dto,
      currentUser,
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
      const result = await this.jobsService.delete(id);

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

  @Get(":id")
  async findOne(@Param('id') id:number) : Promise<Job>{
    return await this.jobsService.findOne(id)
  }
}
