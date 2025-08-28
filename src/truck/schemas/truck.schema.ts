import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Truck extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({})
  year: string;

  @Prop({})
  color: string;

  @Prop({})
  plates: string;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
