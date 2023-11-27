import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { AuthService } from './auth.service';
import {
  AuthResponseDto,
  LoginDto,
  LogoutResponseDto,
  RegisterDto,
} from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register
  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  async register(@Body(ValidationPipe) registerUserDto: RegisterDto) {
    return this.authService.register(registerUserDto);
  }

  // Login
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Email is wrong, or password is wrong or email not verified',
  })
  @ApiTooManyRequestsResponse({
    description:
      'Too many failed login attempts. Please try again after 15 minutes.',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Req() req: MyRequest) {
    return await this.authService.login(loginDto, req.ip);
  }

  // Logout
  @ApiOperation({ summary: 'Logout' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ type: LogoutResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  public async logout(@Req() req: MyRequest) {
    await this.authService.logout(req.user.id);
    return { message: 'Disconnect...' };
  }
}
