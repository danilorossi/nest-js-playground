import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  // NOTE can specify different types of Exceptions to be processed by the filter
  catch(exception: HttpException, response) {

    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: `It's a message from the exception filter`,
      });
  }
}
