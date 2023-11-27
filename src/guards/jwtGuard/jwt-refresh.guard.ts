import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MyRequest } from '@src/types/request.interface';

@Injectable()
export class JwtAuthRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<MyRequest>();
    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedException('Token not found');
      }
      const authHeader = req.headers?.authorization;
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];
      const tokenType = req.headers['token-type'];
      if (bearer !== 'Bearer' || tokenType !== 'refresh_token') {
        throw new UnauthorizedException('Invalid token type');
      }

      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      const user = this.jwtService.verify(token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_PRIVATE_KEY'),
      });

      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException(`Not authorized ${e.message}`);
    }
  }
}
