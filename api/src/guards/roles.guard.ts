import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPaylodDto } from '../auth/dtos/loginPayload.dto';
import { JWT_SECRET } from 'src/constants/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPaylodDto | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) return false;

    return true;
  }
}
