import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Post()
  create(@Body() body: any) {
    return this.assetService.create(body);
  }
}
