import { ChannelEntity } from '../entities/channel.entity';

export class ReturnChannellDto {
  id: number;
  name: string;
  description: string;

  constructor(userEntity: ChannelEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.description = `${userEntity.description}`;
  }
}
