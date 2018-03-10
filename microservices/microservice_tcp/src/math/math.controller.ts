import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    console.log('> [MS_tcp] sum request')
    return (data || []).reduce((a, b) => a + b);
    //return new Promise((resolve, reject) => resolve((data || []).reduce((a, b) => a + b)));
  }

}
