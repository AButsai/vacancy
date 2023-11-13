import { TypeOrmModule } from '@db/typeorm.config';
import { MailModule } from '@entities/mail/mail.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { AuthModule } from './entities/auth/auth.module';
import { GoogleModule } from './entities/google/google.module';
import { PasswordModule } from './entities/password/password.module';
import { TokensModule } from './entities/tokens/tokens.module';
import { UploadModule } from './entities/upload/upload.module';
import { UserModule } from './entities/user/user.module';
import { VacancyModule } from './entities/vacancy/vacancy.module';
import { CorsMiddleware } from './middleware/cors-middleware';

@Module({
  imports: [
    TypeOrmModule,
    UploadModule,
    UserModule,
    AuthModule,
    ConfigModule,
    TokensModule,
    AttemptsModule,
    MailModule,
    VacancyModule,
    GoogleModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
