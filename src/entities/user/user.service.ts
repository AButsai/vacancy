import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

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
  public async update(id: string, body: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    Object.assign(user, body);
    await this.userRepository.save(user);
    return await this.getUser(user.id);
  }

  // Delete user
  public async delete(id: string) {
    await this.userRepository.delete(id);
  }

  // Get user
  private async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['vacancy'],
    });
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
