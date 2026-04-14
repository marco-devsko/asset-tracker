import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Asset } from '../asset/asset.schema';
import { Types } from 'mongoose';

@Schema()
export class Transaction {
  @Prop()
  amount: number;

  @Prop()
  date: string;

  @Prop()
  process: 'buy' | 'sell';

  @Prop({ type: Types.ObjectId, ref: 'Asset' })
  asset: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
