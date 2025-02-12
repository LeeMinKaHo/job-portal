import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "src/database/entities/application.entity";
import { ApplicationService } from "./services/application.service";
import { JobModule } from "../job/job.module";
import { ApplicationsController } from "./controllers/application.controller";

@Module({
    providers:[ApplicationService],
    controllers:[ApplicationsController],
    exports:[],
    imports:[TypeOrmModule.forFeature([Application]) , JobModule]
})
export class ApplicationModule{}