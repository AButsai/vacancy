import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyController } from './vacancy.controller';
import { VacancyEntity } from './vacancy.entity';
import { VacancyService } from './vacancy.service';
import { UserEntity } from '@entities/user/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VacancyEntity, UserEntity]), JwtGuardsModule],
  controllers: [VacancyController],
  providers: [VacancyService, ConfigService],
})
export class VacancyModule {}
