import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { CommandsGateway } from './commands.gateway';

@Module({
  components: [EventsGateway, CommandsGateway],
})
export class EventsModule {}
