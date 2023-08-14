import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'User email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({
    example: 'Mark',
    description: 'User name',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class AuthResponseDto {
  @ApiProperty({
    example: 'FGfchJHGfkJGC_kgjkvKGCKJc.HVKUyfkj...',
    description: 'accessToken',
  })
  accessToken: string;

  @ApiProperty({
    example: 'FGfchJHGfkJGC_kgjkvKGCKJc.HVKUyfkj...',
    description: 'refreshToken',
  })
  refreshToken: string;
}

export class LogoutResponseDto {
  @ApiProperty({
    example: 'Disconnect...',
    description: 'Logout',
  })
  message: string;
}
