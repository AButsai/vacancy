import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  CheckEmailResponseDto,
  EmailDto,
  EmailResendResponseDto,
} from './dto/mail.dto';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('api/mail')
export class MailController {
  private readonly expirationDate: Date;
  constructor(private readonly mailService: MailService) {
    this.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  // Check email
  @ApiOperation({ summary: 'Check email' })
  @ApiResponse({ status: 201, type: CheckEmailResponseDto })
  @ApiConflictResponse({ description: 'Email already exists' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('check-email')
  async checkPhone(@Body() body: EmailDto) {
    return this.mailService.checkEmail(body.email);
  }

  // Verify email
  @Get('verify-email/:verifyToken')
  @ApiOperation({ summary: 'User email verification' })
  async verifyEmail(
    @Param('verifyToken') verifyToken: string,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.mailService.verifyEmail(
      verifyToken,
    );
    res.cookie('refreshToken', refreshToken, {
      expires: this.expirationDate,
      httpOnly: true,
    });
    const redirectUrl = `${
      process.env.REDIRECT_TO_SITE_HOME
    }?userData=${encodeURIComponent(JSON.stringify(accessToken))}`;
    res.redirect(redirectUrl);
  }

  // Resend Email
  @ApiOperation({ summary: 'Resend email' })
  @ApiResponse({
    status: 201,
    description: 'Email resend',
    type: EmailResendResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Email is already verified' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('resend-email')
  async resendingEmail(@Body() body: EmailDto) {
    return this.mailService.resendEmail(body.email);
  }
}
