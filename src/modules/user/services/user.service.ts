import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUser } from "../dto/create_user.dto";
import * as bcrypt from 'bcrypt';
import { Role } from "src/modules/auth/enum/role.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";
import { plainToInstance } from "class-transformer";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>
    ){}

    async findOneById(id:number) : Promise<User>{
        const user = await this.usersRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return plainToInstance(User,user);
    }
    async findOneByMail(gmail:string) : Promise<User>{
        const user =  await this.usersRepository.findOneBy({gmail})
        if (!user) {
            throw new NotFoundException(`User with gmail ${gmail} not found`);
        }
        return user;
    }
    async register(newUser: CreateUser ): Promise<User> {
        try {
            const user = this.findOneByMail(newUser.gmail)
            if (user){
            const salt = await bcrypt.genSaltSync()
            const password_hash = await bcrypt.hash(newUser.password, salt);
            const create_user: User = this.usersRepository.create({...newUser , password:password_hash });
            return await this.usersRepository.save(create_user);}
            else {
                throw new Error("Tài khoản đã được đăng ký")
            }
        } catch (e) {
            // Xử lý lỗi, ví dụ log lỗi hoặc ném một lỗi cụ thể
            throw new Error(`Failed to register user: ${e.message}`);
        }
    }    
    async updateToken (id : number , updateUserTokenDto : UpdateUserDto) : Promise<User>{
        await this.usersRepository.update({ id }, updateUserTokenDto);
        return await this.usersRepository.findOne({ where: { id } });
    } 
    delete_user(id:number){
        this.usersRepository.update({id} , {active: false})
    }
} 