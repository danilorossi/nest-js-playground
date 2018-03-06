import { WsResponse } from '@nestjs/common';

import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  // WebSocketServer,
  // WsException,
} from '@nestjs/websockets';

@WebSocketGateway()
export class CommandsGateway {

  // NOTE: Gateway won't start until you place it inside components array.
  @SubscribeMessage('commands')
  onEvent(client, data): WsResponse<any> {
    console.log('> MSG RECEIVED on commands channel', data)
    const event = 'commands-response';
    return { event, data };
    // NOTE: it's possible to emit messages using standard socket.io approach:
    //     client.emit()
    // but then it's impossible to make use of interceptors.
  }

}
