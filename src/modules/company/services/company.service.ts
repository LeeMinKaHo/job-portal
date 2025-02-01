import { Injectable } from '@nestjs/common';
import { Company } from 'src/database/entities/company.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dto/create_company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { User } from 'src/database/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    private dataSource: DataSource,
  ) {}

  async findOne(id: number): Promise<Company | null> {
    return await this.companiesRepository.findOneBy({ id });
  }
  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }
  async create(
    createCompanyDto: CreateCompanyDto,
    file: Express.Multer.File,
    currentUser: User,
  ): Promise<Company> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
       
      // Tạo entity mới nhưng chưa lưu vào database
      const newCompany = this.companiesRepository.create({...createCompanyDto , userId:currentUser.id});

      // Lưu entity vào database để có ID
      const savedCompany = await queryRunner.manager.save(newCompany);

      // Định nghĩa đường dẫn thư mục
      const subFolderDir = `companies/${savedCompany.id}`;
      const folderDir = path.join('public', subFolderDir);

      // Kiểm tra nếu thư mục chưa tồn tại thì tạo mới
      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
      }

      // Định nghĩa đường dẫn file
      const filePath = path.join(folderDir, file.originalname);
      fs.writeFileSync(filePath, file.buffer);

      // Cập nhật URL hình ảnh cho công ty
      const imgUrl = `${process.env.HOST}/${subFolderDir}/${file.originalname}`;
      savedCompany.img_url = imgUrl;

      // Lưu lại thông tin đã cập nhật
      await queryRunner.manager.save(savedCompany);

      // Commit transaction
      await queryRunner.commitTransaction();

      return savedCompany;
    } catch (e) {
      console.error(e);
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.companiesRepository.delete(id);
  }

  async findOneByUserID(userID: number) {
    return this.companiesRepository.findOneBy({});
  }
}
