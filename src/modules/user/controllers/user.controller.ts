import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "src/database/entities/user.entity";
import { CreateUser } from "../dto/create_user.dto";
import { Role } from "src/modules/auth/enum/role.enum";


@Controller("user")
export class UserController{
    constructor(
        private readonly userService : UserService
    ){}
    @Get(':id')
    find_one(@Param('id' , ParseIntPipe) id : number) : Promise<User>{
       return  this.userService.findOneById(id)
    }
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: User })
    createUser(@Body() createUserDTO : CreateUser ) : Promise<User>
    {
        return this.userService.register(createUserDTO )
    }
}