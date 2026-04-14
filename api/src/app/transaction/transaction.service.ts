import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionModel } from '@asset-tracker-pro/libs';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionModel>
  ) {}

  async create(transaction: TransactionModel) {
    return this.transactionModel.create(transaction);
  }

  async getAll(): Promise<TransactionModel[]> {
    return this.transactionModel.find();
  }

  async deleteById(id: string) {
    return this.transactionModel.findByIdAndDelete({ _id: id });
  }

  async updateById(id: string, transaction: Partial<TransactionModel>) {
    return this.transactionModel.findByIdAndUpdate(id, transaction);
  }
}
