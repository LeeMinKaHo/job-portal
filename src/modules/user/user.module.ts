import { Module } from "@nestjs/common";
import { user_controller } from "./controllers/user.controller";
import { DatabaseModule } from "src/modules/database/database.module";
import { user_provider } from "./services/user.provider";
import { user_service } from "./services/user.service";


@Module({
    controllers:[user_controller],
    exports:[ user_service],
    imports:[DatabaseModule],
    providers:[  ...user_provider , user_service ]
})
export class user_module{}