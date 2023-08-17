import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { Response } from 'express';
import {
  EmailDto,
  EmailResendResponseDto,
  EmailSendResponseDto,
  PasswordsBodyDto,
} from './dto/password.dto';
import { PasswordService } from './password.service';

@ApiTags('Change password')
@Controller('api/passwords')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  // Request password
  @ApiOperation({ summary: 'Request change password' })
  @ApiResponse({
    status: 201,
    description: 'Email send',
    type: EmailSendResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('request')
  async requestChangePassword(@Body() body: EmailDto) {
    return this.passwordService.requestChangePassword(body.email);
  }

  // Verify request password
  @ApiOperation({ summary: 'Verify change password' })
  @ApiOkResponse({ description: 'Redirect to password change form' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get('verify/:verifyToken')
  async verifyChangePassword(
    @Param('verifyToken') verifyToken: string,
    @Res() res: Response,
  ) {
    const userData = await this.passwordService.verifyChangePassword(
      verifyToken,
    );
    const redirectUrl = `${
      process.env.REDIRECT_TO_PASSWORD_CHANGE_FORM
    }?userData=${encodeURIComponent(JSON.stringify(userData))}`;
    res.redirect(redirectUrl);
  }

  // Change password
  @ApiOperation({ summary: 'Password change' })
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
  @ApiOkResponse({ description: 'Password changed' })
  @ApiBadRequestResponse({ description: 'Passwords do not match' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch('change')
  async changePassword(
    @Body() changePasswordDto: PasswordsBodyDto,
    @Req() req: MyRequest,
  ) {
    return this.passwordService.changePassword(changePasswordDto, req.user.id);
  }

  // Resend email
  @ApiOperation({ summary: 'Resend email' })
  @ApiResponse({
    status: 201,
    description: 'Email resend',
    type: EmailResendResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Email is already verified' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('resend')
  async resendingEmail(@Body() body: EmailDto) {
    return this.passwordService.resendEmail(body.email);
  }
}
