import {
  Get,
  Post,
  HttpCode,
  Req,
  Body,
  Param,
  Controller,
  HttpStatus,
  HttpException,
  UseFilters,
  UsePipes,
} from '@nestjs/common';


import {
  Rx
} from 'rx';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

// Common: should it be imported as a module?
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

// @UseFilters(new HttpExceptionFilter())
//    (error filter class-scoped example)
//    > every route handler inside the CatsController
@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Get()
  root(@Req() request) {
    return this.catsService.findAll();
  }

  @Get('/details/test/:id') // NOTE; won't work, fall into the next route
  async findOne(@Param('id', new ParseIntPipe()) id) {
    return await this.catsService.findOne(id);
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
  create(
    // parma-scoped pipe
    @Body((new ValidationPipe())) createCatDto: CreateCatDto
  ) {
    this.catsService.create(createCatDto);
  }

  // @UserFilters can be method-scoped (like here),
  // but also class-scoped (check comment on top of
  // class declaration) or global-scoped
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe()) // method-scope pipe
  @Post('/fail')
  fail(@Body() createCatDto: CreateCatDto) {
    // Also, every unexpected error (not an HttpException or inherit)
    // will be translated into a JSON 500 Internal server error)
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('/fail/custom')
  failCustom(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException;
  }

}
