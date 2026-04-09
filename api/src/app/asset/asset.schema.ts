import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Asset {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  iconUrl: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
