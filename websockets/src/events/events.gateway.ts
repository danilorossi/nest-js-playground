import { WsResponse } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

const STREAM_COMPLETE_DELAY = 10000;
const DATA_INTERVAL_DELAY = 500;

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {

  afterInit(server: any) {
    console.log('init'); // TODO called twice?
  }

  @SubscribeMessage('events')
  onEvent(client, data): Observable<WsResponse<number>> {
    console.log('> MSG RECEIVED on events channel', data)
    const event = 'events-stream';
    return Observable.create(function(observer) {
       // Indicate that there will be no more data)
      setTimeout(() => observer.complete(), STREAM_COMPLETE_DELAY);

      // Emit this value after some time
      setInterval(() => observer.next(`[Payload="${Date.now()}"]`), DATA_INTERVAL_DELAY);
    }).map(res => ({ event, data: res }));
  }

}
