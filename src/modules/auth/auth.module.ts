import { Module } from "@nestjs/common";

import { authService } from "./services/auth.service";

import { authController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
    controllers:[authController ],
    exports:[],
    imports:[UserModule, JwtModule.register({})],
    providers:[ authService ]
})
export class authModule{}