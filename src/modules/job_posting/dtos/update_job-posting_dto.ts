import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDate } from "class-validator"

export class update_job_posting_dto{
    id : number

     @IsString()
    salary:number

    @IsNumber()
    @IsPositive()
    recruitment_quantity:number
    
    @IsString()
    @IsNotEmpty()
    benefits : string
        
    @IsString()
    @IsNotEmpty()
    job_description:string
        
    @IsDate()
    @IsNotEmpty()
    application_deadline:string
}