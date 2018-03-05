import { PipeTransform, Pipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// NOTE: The  ValidationPipe only works with TypeScript.
// If you are using plain JavaScript, I'd recommend using the Joi library.
@Pipe()
export class ValidationPipe implements PipeTransform<any> {

    async transform(value, metadata: ArgumentMetadata) {
      const { metatype } = metadata;
      if (!metatype || !this.toValidate(metatype)) {
          return value;
      }
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        console.log(errors);
        throw new BadRequestException('Validation failed');
      }
      return value;
    }

    private toValidate(metatype): boolean {
      const types = [String, Boolean, Number, Array, Object];
      return !types.find((type) => metatype === type);
    }
}

// NOTE: Pipes, same as exception filters they can be
// - method-scoped,
// - controller-scoped
// - and global-scoped.
// - Additionally, a pipe may be param-scoped.
/*
interface ArgumentMetadata {
    type: 'body' | 'query' | 'param' | 'custom';
    metatype?: new (...args) => any;
    data?: string;
}
*/
