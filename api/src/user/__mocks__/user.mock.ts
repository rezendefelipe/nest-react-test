import { UserEntity } from '../entities/user.entity';

export const userEntityMock: UserEntity = {
  id: 1,
  name: 'test test',
  email: 'test@test.com',
  password: '$2b$10$qZwAGW.7fHXq7YtcpRAtBeXCY2vXRmxXNPtqpSCxgOLMuIhz5tonG',
  createdAt: new Date(),
  updateAt: new Date(),
};
