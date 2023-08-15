import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  private readonly expirationDate: Date;
  constructor(private readonly userService: UserService) {
    this.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  @Get('current')
  public async current() {
    return { message: 'current user' };
  }
}
