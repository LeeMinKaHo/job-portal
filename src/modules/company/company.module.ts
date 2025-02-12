import { Module } from "@nestjs/common";
import { CompanyController } from "./controllers/company.controller";
import { CompanyService } from "./services/company.service";
import { Company } from "src/database/entities/company.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers:[ CompanyController],
    exports:[ CompanyService ],
    imports:[TypeOrmModule.forFeature([Company]) , JwtModule.register({})],
    providers:[CompanyService]
})
export class CompanyModule{}