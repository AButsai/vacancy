import { AttemptsService } from '@entities/attempts/attempts.service';
import { MailService } from '@entities/mail/mail.service';
import { TokensService } from '@entities/tokens/tokens.service';
import { UserEntity } from '@entities/user/user.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokensService: TokensService,
    private readonly attemptsService: AttemptsService,
    private readonly mailService: MailService,
  ) {}

  // Register
  public async register(body: RegisterDto) {
    const { username, email, password } = body;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      throw new ConflictException('User is already exists');
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verifyToken = v4();
    await this.mailService.sendEmailHandler(
      email,
      verifyToken,
      'mail/verify-email',
      username,
    );

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      verifyToken,
      username,
    });

    await this.userRepository.save(newUser);

    return await this.tokensService.generateTokens(newUser);
  }

  // Login
  public async login(body: LoginDto, userIp: string) {
    const { email, password } = body;
    const user = await this.validateUser(email, password, userIp);
    return await this.tokensService.generateTokens(user);
  }

  // Logout
  public async logout(id: string) {
    await this.userRepository.update(id, { refreshToken: null });
  }

  // Validate user
  private async validateUser(email: string, password: string, userIp: string) {
    const user = await this.getUser('email', email);
    if (!user.password) {
      throw new BadRequestException('Update your password');
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      await this.attemptsService.attempts(userIp);
      throw new UnauthorizedException('Password is wrong');
    }
    if (!user.verified) {
      throw new UnauthorizedException('Email not verified');
    }
    await this.attemptsService.deleteAttempts(userIp);

    return user;
  }

  // Get user
  private async getUser(field: string, value: string) {
    const user = await this.userRepository.findOne({
      where: { [field]: value },
      relations: [],
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Not found');
  }
}
