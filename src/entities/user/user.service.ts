import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Current user
  public async current(id: string) {
    return await this.getUser(id);
  }

  // Update user
  public async update(id: string, body: UpdateUserDto) {}

  // Get user
  private async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    delete user.createAt;
    delete user.updateAt;
    delete user.refreshToken;
    delete user.verifyToken;
    return user;
  }
}
