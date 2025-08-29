import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './schemas/location.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { firstValueFrom } from 'rxjs';
import {
  GooglePlaceResult,
  GooglePlacesResponse,
} from './interfaces/google-places-response.interface';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    private readonly httpService: HttpService,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException(
        'Google API Key no está definida en las variables de entorno.',
      );
    }
    const googleResponse = await this.validatePlaceId(
      createLocationDto.place_id,
      apiKey,
    );

    const locationData = this.buildLocation(createLocationDto, googleResponse);
    return this.saveLocation(locationData);
  }

  async validatePlaceId(placeId: string, apiKey: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const response = await firstValueFrom(
      this.httpService.get<GooglePlacesResponse>(url),
    );

    if (response.data.status !== 'OK') {
      throw new BadRequestException('El place_id proporcionado no es válido.');
    }
    return response.data.result; // Devuelve el primer resultado si existe
  }

  buildLocation(
    createLocationDto: CreateLocationDto,
    googleResult: GooglePlaceResult,
  ) {
    return new this.locationModel({
      ...createLocationDto,
      address: googleResult.formatted_address,
      latitude: googleResult.geometry.location.lat,
      longitude: googleResult.geometry.location.lng,
    });
  }

  async saveLocation(locationData: Location) {
    try {
      const loc = await this.locationModel.create(locationData);
      return loc;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('La locación ya se encuentra registrada');
      }
      throw new InternalServerErrorException('Error al crear la locación');
    }
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
