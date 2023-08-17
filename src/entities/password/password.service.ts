import { MailService } from '@entities/mail/mail.service';
import { UserEntity } from '@entities/user/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as urlPath from '@src/constants/urlPath';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { PasswordsBodyDto } from './dto/password.dto';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
  ) {}

  // Request password
  public async requestChangePassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    const verifyToken = v4();
    await this.userRepository.update(user.id, { verifyToken });
    await this.mailService.sendEmailHandler(
      user.email,
      verifyToken,
      urlPath.VERIFY_EMAIL_PASSWORD,
      user.username,
    );
    return { message: 'Email send' };
  }

  // Verify request password
  public async verifyChangePassword(verifyToken: string) {
    return await this.mailService.verifyEmail(verifyToken);
  }

  // Change password
  public async changePassword(body: PasswordsBodyDto, id: string) {
    const { password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    const hashPass = await bcryptjs.hash(password, 10);
    await this.userRepository.update(user.id, { password: hashPass });
    return { message: 'Password changed' };
  }

  // Resend email
  public async resendEmail(email: string) {
    await this.mailService.resendEmail(email, urlPath.VERIFY_EMAIL_PASSWORD);
    return { message: 'Email resend' };
  }
}
