import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
export class CreateTruckDto {
  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId;

  @IsOptional()
  @IsString()
  year: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  plates: string;
}
