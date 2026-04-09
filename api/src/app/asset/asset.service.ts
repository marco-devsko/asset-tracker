import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetModel } from '@asset-tracker-pro/libs';

@Injectable()
export class AssetService {
  constructor(@InjectModel('Asset') private assetModel: Model<AssetModel>) {}

  async create(asset: AssetModel) {
    return this.assetModel.create(asset);
  }

  async getAll(): Promise<AssetModel[]> {
    return this.assetModel.find();
  }

  async deleteById(id: string) {
    return this.assetModel.findByIdAndDelete({ _id: id });
  }

  async updateById(id: string, asset: Partial<AssetModel>) {
    return this.assetModel.findByIdAndUpdate(id, asset);
  }
}
