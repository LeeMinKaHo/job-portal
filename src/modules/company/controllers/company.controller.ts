import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Company } from 'src/database/entities/company.entity';
import { CreateCompanyDto } from '../dto/create_company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/modules/auth/decorator/currentUser.decorator';
import { User } from 'src/database/entities/user.entity';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async find_all(): Promise<Company[]> {
    return await this.companyService.findAll();
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async create(
    @Body() newCompany: CreateCompanyDto,
    @UploadedFile(new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({ maxSize: 300 * 1024 }), // 300 KB
        new FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
      ]
    })) file: Express.Multer.File,
    @CurrentUser() currentUser : User
  ): Promise<Company> {
    console.log(file)
    return this.companyService.create(newCompany,file,currentUser);
  }
}
