import { Test, TestingModule } from '@nestjs/testing';
import { ChannelController } from '../channel.controller';
import { ChannelService } from '../channel.service';
import { CreateChannelDto } from '../dto/createChannel.dto';
import { UpdateChannelDto } from '../dto/updateChannel.dto';
import { ReturnChannellDto } from '../dto/returnChannel.dto';

describe('ChannelController', () => {
  let controller: ChannelController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ChannelService;

  const mockChannelService = {
    getAllChannelsService: jest.fn(),
    getChannelsByIdService: jest.fn(),
    createChannelService: jest.fn(),
    updateChannelService: jest.fn(),
    deleteChannelService: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [
        {
          provide: ChannelService,
          useValue: mockChannelService,
        },
      ],
    }).compile();

    controller = module.get<ChannelController>(ChannelController);
    service = module.get<ChannelService>(ChannelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllChannels', () => {
    it('should return an array of ReturnChannellDto', async () => {
      const channels = [{ id: 1, name: 'Test Channel' }];
      mockChannelService.getAllChannelsService.mockResolvedValue(channels);

      const result = await controller.getAllChannels();
      expect(result).toEqual(
        channels.map((channel) => new ReturnChannellDto(channel)),
      );
      expect(mockChannelService.getAllChannelsService).toHaveBeenCalled();
    });
  });

  describe('getChannelsById', () => {
    it('should return a ReturnChannellDto for the provided ID', async () => {
      const channel = { id: 1, name: 'Test Channel' };
      mockChannelService.getChannelsByIdService.mockResolvedValue(channel);

      const result = await controller.getChannelsById(1);
      expect(result).toEqual(new ReturnChannellDto(channel));
      expect(mockChannelService.getChannelsByIdService).toHaveBeenCalledWith(1);
    });
  });

  describe('createChannel', () => {
    it('should create a new channel', async () => {
      const createChannelDto: CreateChannelDto = { name: 'New Channel' };
      const savedChannel = { id: 1, ...createChannelDto };
      mockChannelService.createChannelService.mockResolvedValue(savedChannel);

      const result = await controller.createChannel(createChannelDto);
      expect(result).toEqual(savedChannel);
      expect(mockChannelService.createChannelService).toHaveBeenCalledWith(
        createChannelDto,
      );
    });
  });

  describe('updateChannel', () => {
    it('should update a channel and return a ReturnChannellDto', async () => {
      const updateChannelDto: UpdateChannelDto = { name: 'Updated Channel' };
      const updatedChannel = { id: 1, name: 'Updated Channel' };
      mockChannelService.updateChannelService.mockResolvedValue(updatedChannel);

      const result = await controller.updateChannel(1, updateChannelDto);
      expect(result).toEqual(new ReturnChannellDto(updatedChannel));
      expect(mockChannelService.updateChannelService).toHaveBeenCalledWith(
        1,
        updateChannelDto,
      );
    });
  });

  describe('deleteChannel', () => {
    it('should delete a channel by ID', async () => {
      const deleteMessage = { message: 'Channel successfully deleted' };
      mockChannelService.deleteChannelService.mockResolvedValue(deleteMessage);

      const result = await controller.deleteChannel(1);
      expect(result).toEqual(deleteMessage);
      expect(mockChannelService.deleteChannelService).toHaveBeenCalledWith(1);
    });
  });
});
