import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwt.mock';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { loginPayloadMock } from '../__mocks__/login-user.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email are valid', async () => {
    const user = await service.login(loginPayloadMock);

    expect(user).toStrictEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should return error if password is invalid', async () => {
    expect(
      service.login({
        ...loginPayloadMock,
        password: 'wrongPassword',
      }),
    ).rejects.toThrow();
  });

  it('should return error if email does not exists', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);
    expect(
      service.login({ ...loginPayloadMock, email: 'wrong@email.com' }),
    ).rejects.toThrow();
  });

  it('should return error in user service', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error());
    expect(service.login(loginPayloadMock)).rejects.toThrow();
  });
});
