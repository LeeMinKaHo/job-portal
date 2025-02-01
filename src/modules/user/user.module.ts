import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";

import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";


@Module({
    controllers:[UserController],
    exports:[ UserService],
    imports:[TypeOrmModule.forFeature([User])],
    providers:[ UserService ]
})
export class UserModule{}