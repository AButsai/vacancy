import { VacancyEntity } from '@entities/vacancy/vacancy.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, VacancyEntity]),
    JwtGuardsModule,
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
