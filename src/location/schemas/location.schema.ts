import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Location extends Document {
  @Prop({ unique: true, required: true })
  place_id: string;

  @Prop({})
  address: string;

  @Prop({})
  latitude: number;

  @Prop({})
  longitude: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
