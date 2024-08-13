import { Module } from '@nestjs/common';
import { ChannelController } from './channel/channel.controller';
import { ChannelService } from './channel/channel.service';

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class AppModule {}
