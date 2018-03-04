import {
  Get,
  Post,
  HttpCode,
  Req,
  Body,
  Param,
  Controller
} from '@nestjs/common';


import {
  Rx
} from 'rx';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Get()
  root(@Req() request) {
    return this.catsService.findAll();
  }

  @Get('/details/:name')
  findOne(@Param() params) {
    return this.catsService.findAll().filter(cat => cat.name === params.name);
  }

  @Get('/async')
  async findAllAsync(): Promise<any[]> {
    return this.catsService.findAll();
  }

  @Get('/stream')
  findAllStream(): Observable<any[]> {
    return Rx.Observable.of(this.catsService.findAll());
  }

  @HttpCode(204)
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

}
