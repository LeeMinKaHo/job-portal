import { Role } from "src/modules/auth/enum/role.enum"

export class CreateUser{
    gmail:string
    password:string
    role:Role
}