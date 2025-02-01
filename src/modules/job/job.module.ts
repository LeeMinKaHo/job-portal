import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/modules/database/database.module";
import { JobService } from "./services/job.service";
import { jobController } from "./controllers/job.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { CompanyModule } from "../company/company.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "src/database/entities/job.entity";

@Module({
    controllers:[ jobController ],
    exports:[JobService],
    imports:[ TypeOrmModule.forFeature([Job]) , UserModule , JwtModule.register({}) , CompanyModule],
    providers:[ JobService]
})
export class JobModule{}
