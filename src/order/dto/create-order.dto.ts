import { IsNotEmpty, IsOptional, IsMongoId, IsEnum } from 'class-validator';
import { Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: string;

  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  truck: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  pickup: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  dropoff: Types.ObjectId;
}
