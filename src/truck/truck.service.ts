import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './schemas/truck.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TruckService {
  constructor(@InjectModel(Truck.name) private truckModel: Model<Truck>) {}

  async create(createTruckDto: CreateTruckDto): Promise<Truck> {
    const truck = await this.truckModel.create(createTruckDto);
    return truck;
  }

  async findAll(): Promise<Truck[]> {
    return await this.truckModel.find().exec();
  }

  async findOne(id: string) {
    const truck = await this.truckModel.findById(id);
    if (!truck)
      throw new NotFoundException(`Camión con id ${id} no encontrado`);
    return truck;
  }

  async update(id: string, updateTruckDto: UpdateTruckDto) {
    const truck = await this.truckModel.findByIdAndUpdate(id, updateTruckDto, {
      new: true,
    });
    if (!truck)
      throw new NotFoundException(`Camión con id ${id} no encontrado`);
    return truck;
  }

  async remove(id: string) {
    const result = await this.truckModel.findByIdAndDelete(id);
    if (!result)
      throw new NotFoundException(`Camión con id ${id} no encontrado`);
  }
}
