import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    type: String,
    enum: OrderStatus,
    required: true,
    default: OrderStatus.CREATED,
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Truck', required: true })
  truck: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  pickup: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  dropoff: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
