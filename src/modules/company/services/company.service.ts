import { Body, Inject, Injectable } from "@nestjs/common";
import { company } from "src/database/entities/company.entity";
import { DeleteResult, Repository } from "typeorm";
import { create_company } from "../dto/create_company.dto";

@Injectable()
export class company_service{
    constructor(
        @Inject("COMPANY_REPOSITORY")
        private company_repository : Repository<company>
    ){}

    async find_one(id : number) : Promise< company | null>{
        return await this.company_repository.findOneBy({id})
    }
    async find_all() : Promise< company[] >{
        return this.company_repository.find()
    }
    async create (newCompany : create_company ): Promise<company>{
        console.log(newCompany)
        const newCom = this.company_repository.create(newCompany)
        console.log(newCom)
        return await this.company_repository.save(newCom)
    }
    
    async delete (id : number) : Promise<DeleteResult>{
        return  await  this.company_repository.delete(id)
    }
}