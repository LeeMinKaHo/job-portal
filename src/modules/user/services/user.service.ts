import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { user } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { createUser } from "../dto/create_user.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class user_service {
    constructor(
         @Inject("USER_REPOSITORY")
        private user_repository : Repository<user>
    ){}

    async find_one_by_id(id:number) : Promise<user>{
        const user = await this.user_repository.findOneBy({id})
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async find_one_by_mail(gmail:string) : Promise<user>{
        const user =  await this.user_repository.findOneBy({gmail})
        if (!user) {
            throw new NotFoundException(`User with gmail ${gmail} not found`);
        }
        return user;
    }
    async register(new_user: createUser): Promise<user> {
        try {
            const salt = await bcrypt.genSaltSync()
            const password_hash = await bcrypt.hash(new_user.password, salt);
            const create_user: user = this.user_repository.create({...new_user , password:password_hash});
            return await this.user_repository.save(create_user);
        } catch (e) {
            // Xử lý lỗi, ví dụ log lỗi hoặc ném một lỗi cụ thể
            throw new Error(`Failed to register user: ${e.message}`);
        }
    }    
    delete_user(id:number){
        this.user_repository.update({id} , {active: false})
    }
} 