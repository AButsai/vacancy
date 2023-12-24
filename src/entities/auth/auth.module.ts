import { AttemptsModule } from '@entities/attempts/attempts.module';
import { BlockIpMiddleware } from '@entities/attempts/middleware/attempts.middleware';
import { MailModule } from '@entities/mail/mail.module';
import { TokensModule } from '@entities/tokens/tokens.module';
import { UserEntity } from '@entities/user/user.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtGuardsModule,
    TokensModule,
    AttemptsModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BlockIpMiddleware).forRoutes('api/auth/login');
  }
}
