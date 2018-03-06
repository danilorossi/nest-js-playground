import { WsResponse } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {

  afterInit(server: any) {
    console.log('init'); // TODO called twice?
  }

  @SubscribeMessage('events')
  onEvent(client, data): Observable<WsResponse<number>> {
    console.log('> MSG RECEIVED on events channel', data)
    const event = 'events-stream';
    const response = [1, 2, 3];
    return Observable.from(response).map(res => ({ event, data: res }));
  }

}
