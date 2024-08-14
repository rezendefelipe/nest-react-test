import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from '../channel.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelEntity } from '../entities/channel.entity';
import { NotFoundException } from '@nestjs/common';

describe('ChannelService', () => {
  let service: ChannelService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<ChannelEntity>;

  const mockChannelRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: getRepositoryToken(ChannelEntity),
          useValue: mockChannelRepository,
        },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    repository = module.get<Repository<ChannelEntity>>(
      getRepositoryToken(ChannelEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllChannelsService', () => {
    it('should return an array of channels', async () => {
      const channels = [{ id: 1, name: 'Test Channel' }];
      mockChannelRepository.find.mockResolvedValue(channels);

      const result = await service.getAllChannelsService();
      expect(result).toEqual(channels);
      expect(mockChannelRepository.find).toHaveBeenCalled();
    });
  });

  describe('getChannelsByIdService', () => {
    it('should return a channel by ID', async () => {
      const channel = { id: 1, name: 'Test Channel' };
      mockChannelRepository.findOne.mockResolvedValue(channel);

      const result = await service.getChannelsByIdService(1);
      expect(result).toEqual(channel);
      expect(mockChannelRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if channel not found', async () => {
      mockChannelRepository.findOne.mockResolvedValue(null);

      await expect(service.getChannelsByIdService(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockChannelRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('createChannelService', () => {
    it('should create a new channel', async () => {
      const createChannelDto = { name: 'New Channel' };
      const savedChannel = { id: 1, ...createChannelDto };
      mockChannelRepository.save.mockResolvedValue(savedChannel);

      const result = await service.createChannelService(createChannelDto);
      expect(result).toEqual(savedChannel);
      expect(mockChannelRepository.save).toHaveBeenCalledWith(createChannelDto);
    });
  });

  describe('updateChannelService', () => {
    it('should update a channel', async () => {
      const channel = { id: 1, name: 'Old Channel' };
      const updateChannelDto = { name: 'Updated Channel' };
      const updatedChannel = { ...channel, ...updateChannelDto };

      mockChannelRepository.findOne.mockResolvedValue(channel);
      mockChannelRepository.save.mockResolvedValue(updatedChannel);

      const result = await service.updateChannelService(1, updateChannelDto);
      expect(result).toEqual(updatedChannel);
      expect(mockChannelRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockChannelRepository.save).toHaveBeenCalledWith(updatedChannel);
    });
  });

  describe('deleteChannelService', () => {
    it('should delete a channel by ID', async () => {
      const channel = { id: 1, name: 'Test Channel' };
      mockChannelRepository.findOne.mockResolvedValue(channel);
      mockChannelRepository.delete.mockResolvedValue({});

      const result = await service.deleteChannelService(1);
      expect(result).toEqual({ message: 'Channel successfully deleted' });
      expect(mockChannelRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockChannelRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if channel not found', async () => {
      mockChannelRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteChannelService(1)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockChannelRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
