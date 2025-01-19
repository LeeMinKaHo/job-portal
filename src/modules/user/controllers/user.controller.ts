import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { user_service } from "../services/user.service";
import { user } from "src/database/entities/user.entity";
import { createUser } from "../dto/create_user.dto";


@Controller("user")
export class user_controller{
    constructor(
        private readonly user_service : user_service
    ){}
    @Get()
    find_one(@Param() id : number) : Promise<user>{
       return  this.user_service.find_one_by_id(id)
    }
    @Post()
    createUser(@Body() createUserDTO : createUser) : Promise<user>
    {
        return this.user_service.register(createUserDTO)
    }
}