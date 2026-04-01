import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getData(@Query('size') size: number, @Query('page') page: number) {
    return this.appService.getData(page, size);
  }

  @Get('/calculate')
  getCalculation(@Query('a') a: number, @Query('b') b: number) {
    return this.appService.getCalculation(a, b);
  }

  @Get('/allprodusers')
  getAllProdUsers() {
    return this.appService.getAllProdUsers();
  }

  @Post('/addproduser')
  addProdUser(
    @Query('name') name: string,
    @Query('surname') surname: string,
    @Query('email') email: string,
    @Query('born') born: string
  ) {
    console.log("Name: " + name);
    return this.appService.addNewProdUser(name, surname, email, born);
  }
}
