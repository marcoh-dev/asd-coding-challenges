import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollGateway } from './poll.gateway';

@Module({
  providers: [PollService, PollGateway],
})
export class PollModule {}
