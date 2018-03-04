import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsController],
    components: [CatsService],
    exports: [CatsService]
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {
    this.catsService.init();
  }
}
