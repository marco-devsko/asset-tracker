import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetModel } from '@asset-tracker-pro/libs';

@Controller('asset')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Post()
  create(@Body() body: AssetModel) {
    return this.assetService.create(body);
  }

  @Get('all')
  getAll() {
    return this.assetService.getAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() asset: Partial<AssetModel>) {
    return this.assetService.updateById(id, asset);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.assetService.deleteById(id);
  }
}
