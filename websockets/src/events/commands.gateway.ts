import { WsResponse } from '@nestjs/common';

import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  // WebSocketServer,
  WsException,
} from '@nestjs/websockets';

@WebSocketGateway()
export class CommandsGateway {

  // NOTE: Gateway won't start until you place it inside components array.
  @SubscribeMessage('commands')
  onEvent(client, data): WsResponse<any> {
    const event = 'commands-response';
    switch(data.type) {
      case 'FORCE_EXCEPTION':
        console.log('> Client triggering a WsException.');
        throw new WsException('Forced exception!');
      case 'CHECK_COMMANDS_CHANNEL':
        console.log('> New client connected to <commands-response> channel');
        return { event, data: { msg: 'You are now connected to the <commands-response> channel.' } };
      default:
        return { event, data };
    }

    // NOTE: it's possible to emit messages using standard socket.io approach:
    //     client.emit()
    // but then it's impossible to make use of interceptors.
  }

}
