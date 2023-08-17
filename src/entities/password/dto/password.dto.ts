import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@src/utils/regex-expressions';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class EmailDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'User login',
  })
  @IsString()
  @IsEmail()
  email: string;
}

export class PasswordsBodyDto {
  @ApiProperty({ example: 'password', description: 'New password user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  public password: string;

  @ApiProperty({ example: 'password', description: 'Confirm password user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  public confirmPassword: string;
}

export class EmailSendResponseDto {
  @ApiProperty({ example: 'Email send', description: 'Email send' })
  message: string;
}

export class EmailResendResponseDto {
  @ApiProperty({ example: 'Email resend', description: 'Email resend' })
  message: string;
}
