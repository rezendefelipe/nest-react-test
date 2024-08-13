import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/createChannel.dto';
import { UpdateChannelDto } from './dto/updateChannel.dto';

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

  async updateChannelService(
    id: number,
    channelData: UpdateChannelDto,
  ): Promise<ChannelEntity> {
    const channel = await this.getChannelsByIdService(id);
    return await this.channelRepository.save({
      ...channel,
      ...channelData,
    });
  }

  async deleteChannelService(id: number) {
    await this.getChannelsByIdService(id);
    await this.channelRepository.delete(id);

    return { message: 'Channel successfully deleted' };
  }
}
