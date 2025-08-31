import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { ToObjectId } from 'src/common/transforms/object-id.transform';
export class CreateTruckDto {
  @IsNotEmpty()
  @Transform(ToObjectId())
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
