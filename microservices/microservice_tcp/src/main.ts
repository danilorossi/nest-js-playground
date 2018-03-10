import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    transport: Transport.TCP,
		port: 5667
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
