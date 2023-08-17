import { TokensService } from '@entities/tokens/tokens.service';
import { UserEntity } from '@entities/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TUser } from '@src/types/request.interface';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokensService: TokensService,
  ) {}

  // Google auth
  public async auth(googleUser: TUser) {
    const { email, firstName, lastName, picture } = googleUser;
    const user = await this.userRepository.findOne({
      where: { email: googleUser.email },
    });
    if (user) {
      return await this.tokensService.generateTokens(user);
    }

    const newUser = this.userRepository.create({
      email,
      username: `${firstName} ${lastName}`,
      avatarURL: picture,
      verified: true,
    });
    await this.userRepository.save(newUser);

    return await this.tokensService.generateTokens(newUser);
  }
}
