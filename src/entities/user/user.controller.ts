import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  private readonly expirationDate: Date;
  constructor(private readonly userService: UserService) {
    this.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
}
