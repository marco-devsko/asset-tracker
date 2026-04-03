import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssetService {
  constructor(@InjectModel('Asset') private assetModel: Model<any>) {}

  async create(asset: any) {
    return this.assetModel.create(asset);
  }
}
