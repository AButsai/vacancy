import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthTokenTypeGuard } from './jwt-auth-token-type.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [
    JwtAuthGuard,
    JwtRefreshGuard,
    JwtAuthTokenTypeGuard,
    ConfigService,
  ],
  exports: [JwtAuthGuard, JwtRefreshGuard, JwtModule],
})
export class JwtGuardsModule {}
