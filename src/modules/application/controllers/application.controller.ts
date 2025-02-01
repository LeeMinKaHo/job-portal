import { Controller, Post } from "@nestjs/common";
import { ApplicationService } from "../services/application.service";
import { CreateApplication } from "../dto/create-application.dto";
import { Application } from "src/database/entities/application.entity";

@Controller("applications")
export class ApplicationsController{
    constructor(
        private applicationService : ApplicationService
    ){}
    @Post("")
    async create( createApplication : CreateApplication ) : Promise<Application> {
        return await this.applicationService.create( createApplication)
    }
}