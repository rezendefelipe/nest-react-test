import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelService {
  getAllChannelsService() {
    return {
      test: 'teste',
    };
  }

  getChannelsByIdService(id: number) {
    return {
      id,
    };
  }

  createChannelService(channelData: any) {
    return { ...channelData };
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
