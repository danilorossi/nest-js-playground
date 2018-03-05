import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	// app.useGlobalFilters(new HttpExceptionFilter());
	//	> example of global-scoped http exception filter e.g. logging
	//	> Notice The  useGlobalFilters() method doesn't setup filters
	//		for gateways and microservices.

	// To get filters defined in other modules:
	// const loggerFilter = app
  //	.select(LoggerModule)
  //	.get(LoggerExceptionFilter);


	// NOTE: example of global-scoped pipe
	// app.useGlobalPipes(new ValidationPipe());
	// (doesn't setup pipes for gateways and micro services)
	/* NOTE: if ValidationPipe is registered in the  SharedModule:
	const app = await NestFactory.create(ApplicationModule);
	const validationPipe = app
	  .select(SharedModule)
	  .get(ValidationPipe);

	app.useGlobalPipes(validationPipe);
	*/
	await app.listen(3000);
}
bootstrap();
