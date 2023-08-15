import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import {
  Controller,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { multerOptions } from './config/multer.config';
import { UploadDto, UploadFileResponseDto } from './dto/upload.dto';
import { EUploadPath } from './enums/upload.enum';
import { UploadService } from './upload.service';

@ApiTags('Upload file')
@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Upload file
  @ApiOperation({ summary: 'Upload file' })
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
  @ApiResponse({ status: 200, type: UploadFileResponseDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: UploadDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiPayloadTooLargeResponse({ description: 'File too large' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiParam({
    name: 'path',
    enum: EUploadPath,
    description: 'Path parameter (can be "files" or "avatars")',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':path')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  public async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('path') path: string,
    @Req() req: MyRequest,
  ) {
    return await this.uploadService.uploadAvatar(file, path, req.user.id);
  }
}
