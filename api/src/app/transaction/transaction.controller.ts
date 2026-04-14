import { TransactionService } from './transaction.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionModel } from '@asset-tracker-pro/libs';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: TransactionModel) {
    return this.transactionService.create({
      ...transaction,
    });
  }

  @Get('all')
  getAll() {
    return this.transactionService.getAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() transaction: Partial<TransactionModel>
  ) {
    return this.transactionService.updateById(id, transaction);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.deleteById(id);
  }
}
