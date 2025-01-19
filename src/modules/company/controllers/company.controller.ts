import { Body, Controller, Get, Post } from "@nestjs/common";
import { company_service } from "../services/company.service";
import { company } from "src/database/entities/company.entity";
import { create_company } from "../dto/create_company.dto";

@Controller("company")
export class company_controller{
    constructor(
        private readonly company_service : company_service
    ){}

    @Get()
    async find_all() : Promise<company[]> {
        return await this.company_service.find_all()
    }
    @Post()
    async create( @Body() newCompany : create_company ) : Promise<company>{
        return this.company_service.create(newCompany)
    }
}