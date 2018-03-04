import { Component } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Component()
export class CatsService {
  private readonly cats: Cat[] = [];

  init() {
    console.log('Init CatService if needed');
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
