import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/createChannel.dto';
import { ReturnChannellDto } from './dto/returnChannel.dto';
import { ChannelEntity } from './entities/channel.entity';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/channels')
  async getAllChannels(): Promise<ReturnChannellDto[]> {
    return (await this.channelService.getAllChannelsService()).map(
      (channel) => new ReturnChannellDto(channel),
    );
  }

  @Get('/channels/:id')
  async getChannelsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReturnChannellDto> {
    return new ReturnChannellDto(
      await this.channelService.getChannelsByIdService(id),
    );
  }

  @Post('/channels')
  @UsePipes(ValidationPipe)
  createChannel(@Body() channelData: CreateChannelDto): Promise<ChannelEntity> {
    return this.channelService.createChannelService(channelData);
  }

  @Put('/channels/:id')
  updateChannel(
    @Param('id', ParseIntPipe) id: number,
    @Body() channelData: any,
  ) {
    return this.channelService.updateChannelService(id, channelData);
  }

  @Delete('/channels/:id')
  deleteChannel(@Param('id') id: number) {
    return this.channelService.deleteChannelService(id);
  }
}
