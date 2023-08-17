import { MailModule } from '@entities/mail/mail.module';
import { TokensModule } from '@entities/tokens/tokens.module';
import { UserEntity } from '@entities/user/user.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailModule,
    TokensModule,
    JwtGuardsModule,
  ],
  controllers: [PasswordController],
  providers: [PasswordService, ConfigService],
})
export class PasswordModule {}
