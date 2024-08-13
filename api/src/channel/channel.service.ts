import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/createChannel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}

  getAllChannelsService(): Promise<ChannelEntity[]> {
    return this.channelRepository.find();
  }

  getChannelsByIdService(id: number) {
    return {
      id,
    };
  }

  createChannelService(channelData: CreateChannelDto): Promise<ChannelEntity> {
    return this.channelRepository.save({
      ...channelData,
    });
  }

  updateChannelService(id: number, channelData: any) {
    return {
      id,
      ...channelData,
    };
  }

  deleteChannelService(id: number) {
    return { id };
  }
}
