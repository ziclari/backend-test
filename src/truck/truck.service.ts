import { Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './schemas/truck.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TruckService {
  constructor(@InjectModel(Truck.name) private truckModel: Model<Truck>) {}

  async create(createTruckDto: CreateTruckDto) {
    const truck = await this.truckModel.create(createTruckDto);
    return truck;
  }

  findAll() {
    return `This action returns all truck`;
  }

  findOne(id: string) {
    return `This action returns a #${id} truck`;
  }

  update(id: string, updateTruckDto: UpdateTruckDto) {
    return `This action updates a #${id} truck`;
  }

  remove(id: string) {
    return `This action removes a #${id} truck`;
  }
}
