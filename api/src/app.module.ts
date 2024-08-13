import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelController } from './channel/channel.controller';
import { ChannelService } from './channel/channel.service';

@Module({
  imports: [],
  controllers: [AppController, ChannelController],
  providers: [AppService, ChannelService],
})
export class AppModule {}
