import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getChannelsByIdService(id: number): Promise<ChannelEntity> {
    const channel = await this.channelRepository.findOne({
      where: {
        id,
      },
    });

    if (!channel) {
      throw new NotFoundException(`Channel not found!`);
    }

    return channel;
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

  async deleteChannelService(id: number) {
    await this.getChannelsByIdService(id);
    await this.channelRepository.delete(id);

    return { message: 'Channel successfully deleted' };
  }
}
