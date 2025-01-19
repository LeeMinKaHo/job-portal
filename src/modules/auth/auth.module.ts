import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/modules/database/database.module";
import { authService } from "./services/auth.service";
import { user_service } from "../user/services/user.service";
import { authController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { user_module } from "../user/user.module";
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
    controllers:[authController ],
    exports:[],
    imports:[DatabaseModule  ,user_module, JwtModule.register({
        global:true,
        secret:process.env.SECRET_KEY,
        signOptions:{expiresIn:'60s'}
    })],
    providers:[ authService ]
})
export class authModule{}