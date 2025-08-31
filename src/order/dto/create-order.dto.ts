import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import { Transform } from 'class-transformer';
import { ToObjectId } from 'src/common/transforms/object-id.transform';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: string;

  @IsNotEmpty()
  @Transform(ToObjectId())
  user: Types.ObjectId;

  @IsNotEmpty()
  @Transform(ToObjectId())
  truck: Types.ObjectId;

  @IsOptional()
  @Transform(ToObjectId())
  pickup: Types.ObjectId;

  @IsOptional()
  @Transform(ToObjectId())
  dropoff: Types.ObjectId;
}
