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
    const event = 'events-stream';
    switch(data.type) {

      case 'FORCE_STREAM':
        console.log('> Client triggering a stream.');
        let intervalId = null;
        return Observable.create(function(observer) {
           // Indicate that there will be no more data)
          setTimeout(() => {
            observer.complete();
            intervalId && clearInterval(intervalId);
          }, STREAM_COMPLETE_DELAY);

          // Emit this value after some time
          intervalId = setInterval(() => observer.next(`[Payload="${Date.now()}"]`), DATA_INTERVAL_DELAY);
        }).map(res => ({ event, data: res }));

      case 'CHECK_EVENTS_CHANNEL':
        console.log('> New client connected to <events-stream> channel');
        return { event, data: { msg: 'You are now connected to the <events-stream>> channel.' } };

      default:
        return { event, data };
    }


  }

}
