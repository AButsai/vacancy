import { TypeOrmModule } from '@db/typeorm.config';
import { MailModule } from '@entities/mail/mail.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { AuthModule } from './entities/auth/auth.module';
import { TokensModule } from './entities/tokens/tokens.module';
import { UploadModule } from './entities/upload/upload.module';
import { UserModule } from './entities/user/user.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
