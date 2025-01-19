import { Module } from "@nestjs/common";
import { company_controller } from "./controllers/company.controller";
import { company_provider } from "./services/company.provider";
import { company_service } from "./services/company.service";
import { DatabaseModule } from "src/modules/database/database.module";

@Module({
    controllers:[ company_controller],
    exports:[],
    imports:[DatabaseModule],
    providers:[ ...company_provider,company_service ]
})
export class company_module{}