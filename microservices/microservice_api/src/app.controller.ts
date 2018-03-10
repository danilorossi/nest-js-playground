import { Get, Controller } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {

	@Client({ transport: Transport.TCP, port: 5667 })
	client: ClientProxy;

	@Get('test')
	root(): number {
    console.log('> [MS_api] sending sum request to [MS_tcp]')
    return this.client.send<number>({ cmd: 'sum' }, [1, 2, 3, 4, 5]);
  }

}
