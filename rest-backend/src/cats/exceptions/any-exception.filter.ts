import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch() // Leave the parentheses empty to catch any error
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception, response) {
    response
      .status(500)
      .json({
        statusCode: 500,
        message: `Unknown error?`,
      });
  }
}
