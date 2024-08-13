import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/channels')
  getAllChannels() {
    return this.channelService.getAllChannelsService();
  }

  @Get('/channels/:id')
  getChannelsById(@Param('id') id: number) {
    return this.channelService.getChannelsByIdService(id);
  }

  @Post('/channels')
  createChannel(@Body() channelData: any) {
    return this.channelService.createChannelService(channelData);
  }

  @Put('/channels/:id')
  updateChannel(@Param('id') id: number, @Body() channelData: any) {
    return this.channelService.updateChannelService(id, channelData);
  }

  @Delete('/channels/:id')
  deleteChannel(@Param('id') id: number) {
    return this.channelService.deleteChannelService(id);
  }
}
