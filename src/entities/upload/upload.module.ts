import { UserEntity } from '@entities/user/user.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtGuardsModule],
  controllers: [UploadController],
  providers: [UploadService, ConfigService],
})
export class UploadModule {}
