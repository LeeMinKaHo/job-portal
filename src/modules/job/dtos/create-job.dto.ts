import { Type } from "class-transformer"
import { IsDate, IsNegative, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateJob{
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
    @Type(() => Date)
    @IsNotEmpty()
    application_deadline:Date
}