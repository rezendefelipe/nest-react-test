import { ChannelEntity } from '../entities/channel.entity';

export class ReturnChannellDto {
  name: string;
  description: string;

  constructor(userEntity: ChannelEntity) {
    this.name = userEntity.name;
    this.description = `${userEntity.description}`;
  }
}
