import { Module } from "@nestjs/common";
import { DatabaseModule } from "database.module";
import { job_posting_provider } from "./services/job_posting_provider";
import { job_posting_service } from "./services/job_posting_service";
import { job_posting_controller } from "./controllers/job_posting.controller";

@Module({
    controllers:[ job_posting_controller ],
    exports:[...job_posting_provider],
    imports:[ DatabaseModule],
    providers:[ ...job_posting_provider , job_posting_service]
})
export class job_listing_module{}
