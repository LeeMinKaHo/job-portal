import { IsDate, IsNegative, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class create_job{
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    salary:number

    @IsNotEmpty()
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