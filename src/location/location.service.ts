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
import { LocationCore } from './interfaces/location-core.interface';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    private readonly httpService: HttpService,
  ) {}

  private async validatePlaceId(
    placeId: string,
    apiKey: string,
  ): Promise<GooglePlaceResult> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const response = await firstValueFrom(
      this.httpService.get<GooglePlacesResponse>(url),
    );

    if (response.data.status !== 'OK') {
      throw new BadRequestException(
        response.data.error_message ||
          'El place_id proporcionado no es válido.',
      );
    }
    return response.data.result;
  }

  private buildLocation(
    place_id: string,
    googleResult: GooglePlaceResult,
  ): LocationCore {
    return {
      place_id,
      address: googleResult.formatted_address,
      latitude: googleResult.geometry.location.lat,
      longitude: googleResult.geometry.location.lng,
    };
  }

  private async prepareLocationData(placeId: string): Promise<LocationCore> {
    const apiKey: string | undefined = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException(
        'Google API Key no está definida en las variables de entorno.',
      );
    }
    const googleResponse: GooglePlaceResult = await this.validatePlaceId(
      placeId,
      apiKey,
    );

    return this.buildLocation(placeId, googleResponse);
  }

  private async saveLocation(
    locationData: Partial<Location>,
  ): Promise<Location> {
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

  private async updateLocation(
    id: string,
    locationData: Partial<Location>,
  ): Promise<Location> {
    try {
      const loc = await this.locationModel.findByIdAndUpdate(id, locationData, {
        new: true,
      });
      if (!loc)
        throw new NotFoundException(`Localización con id ${id} no encontrada`);
      return loc;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('La locación ya se encuentra registrada');
      }
      throw new InternalServerErrorException('Error al crear la locación');
    }
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const locationData: LocationCore = await this.prepareLocationData(
      createLocationDto.place_id,
    );
    return this.saveLocation(locationData);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationModel.find();
  }

  async findOne(id: string): Promise<Location> {
    const loc = await this.locationModel.findById(id);
    if (!loc)
      throw new NotFoundException(`Localización con id ${id} no encontrada`);
    return loc;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    if (!updateLocationDto.place_id) {
      throw new BadRequestException(
        'El place_id es obligatorio para actualizar la locación.',
      );
    }
    const locationData: LocationCore = await this.prepareLocationData(
      updateLocationDto.place_id,
    );
    return this.updateLocation(id, locationData);
  }

  async remove(id: string): Promise<void> {
    const result = await this.locationModel.findByIdAndDelete(id);
    if (!result)
      throw new NotFoundException(`Localización con id ${id} no encontrada`);
  }
}
