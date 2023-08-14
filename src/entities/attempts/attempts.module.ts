import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AttemptsEntity } from './attempts.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AttemptsEntity])],
  providers: [AttemptsService],
  exports: [AttemptsService]
})
export class AttemptsModule {}
