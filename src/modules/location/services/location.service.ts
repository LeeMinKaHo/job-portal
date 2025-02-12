import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/database/entities/location.entity';
import { Repository } from 'typeorm';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  findOne(id: number) {
    return this.locationsRepository.find({ where: { id } });
  }
}
