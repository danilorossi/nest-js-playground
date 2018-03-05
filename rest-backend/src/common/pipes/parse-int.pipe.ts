// NOTE; The transformer pipes fill the gap between
// the request of the client and the request handler.

import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException
} from '@nestjs/common';

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
