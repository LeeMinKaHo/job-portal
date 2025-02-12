import { Module } from "@nestjs/common";
import { LocationService } from "./services/location.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Location } from "src/database/entities/location.entity";

@Module({
    controllers:[],
    exports:[ LocationService],
    imports:[TypeOrmModule.forFeature([Location])],
    providers:[LocationService]
})
export class LocationModule{}