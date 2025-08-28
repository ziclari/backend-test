import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './schemas/location.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const loc = await this.locationModel.create(createLocationDto);
    //TODO: Conexión a api externa para obtener latitud y longitud
    return loc;
  }

  async findAll() {
    return await this.locationModel.find();
  }

  async findOne(id: string) {
    const loc = await this.locationModel.findById(id);
    if (!loc)
      throw new NotFoundException(`Localización con id ${id} no encontrada`);
    return loc;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const loc = await this.locationModel.findByIdAndUpdate(
      id,
      updateLocationDto,
      {
        new: true,
      },
    );
    if (!loc)
      throw new NotFoundException(`Localización con id ${id} no encontrada`);
    return loc;
  }

  async remove(id: string) {
    const result = await this.locationModel.findByIdAndDelete(id);
    if (!result)
      throw new NotFoundException(`Localización con id ${id} no encontrada`);
  }
}
