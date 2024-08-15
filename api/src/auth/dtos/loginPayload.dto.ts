import { UserEntity } from '../../user/entities/user.entity';

export class LoginPaylodDto {
  id: number;

  constructor(user: UserEntity) {
    this.id = user.id;
  }

  getPaylod() {
    return {
      id: this.id,
    };
  }
}
