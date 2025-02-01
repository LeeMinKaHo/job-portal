import { Type } from "class-transformer"
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDate } from "class-validator"

export class UpdateJob{
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
     @Type(() => Date)
    @IsNotEmpty()
    application_deadline:string
}