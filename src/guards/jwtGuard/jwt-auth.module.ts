import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtAuthRefreshGuard } from './jwt-refresh.guard';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [JwtAuthGuard, JwtAuthRefreshGuard, ConfigService],
  exports: [JwtAuthGuard, JwtAuthRefreshGuard, JwtModule],
})
export class JwtGuardsModule {}
