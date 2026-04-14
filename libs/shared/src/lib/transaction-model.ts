import { AssetModel } from './asset-model';

export interface TransactionModel {
  _id: string;
  amount: number;
  date: string;
  process: "buy" | "sell"
  asset: AssetModel
}
