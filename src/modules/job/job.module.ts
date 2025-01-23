import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/modules/database/database.module";
import { job_posting_provider } from "./services/job.provider";
import { jobService } from "./services/job.service";
import { jobController } from "./controllers/job_posting.controller";

@Module({
    controllers:[ jobController ],
    exports:[...job_posting_provider],
    imports:[ DatabaseModule],
    providers:[ ...job_posting_provider , jobService]
})
export class jobModule{}
