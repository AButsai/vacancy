import { JwtAuthTokenTypeGuard } from '@guards/jwtGuard/jwt-auth-token-type.guard';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import {
  DeleteVacancyResponseDto,
  VacancyArchiveResponseDto,
  VacancyDto,
  VacancyResponseDto,
} from './dto/vacancy.dto';
import { TSort } from './types/vacancy.types';
import { VacancyService } from './vacancy.service';

@ApiTags('Vacancy')
@Controller('api/vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  // Add vacancy
  @ApiOperation({ summary: 'Add vacancy' })
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
  @ApiOkResponse({ type: VacancyDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Post()
  public async create(@Req() req: MyRequest, @Body() body: VacancyDto) {
    return await this.vacancyService.create(req.user.id, body);
  }

  // Get all vacancy
  @ApiOperation({ summary: 'Get all vacancy' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Items per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'name',
    description: 'Filter by name',
    required: false,
    type: String,
    example: 'SoftRyzen',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Sort order',
    required: false,
    enum: ['asc', 'desc'],
    enumName: 'TSort',
    type: String,
    example: 'asc',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ type: VacancyResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Get()
  public async getAllVacancy(
    @Req() req: MyRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('sort') sort: TSort,
  ) {
    return await this.vacancyService.getAllVacancy(
      req.user.id,
      false,
      page,
      limit,
      sort,
      name,
    );
  }

  // Get archive vacancy
  @ApiOperation({ summary: 'Get vacancy on archive' })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Items per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'name',
    description: 'Filter by name',
    required: false,
    type: String,
    example: 'SoftRyzen',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Sort order',
    required: false,
    enum: ['asc', 'desc'],
    enumName: 'TSort',
    type: String,
    example: 'asc',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ type: VacancyArchiveResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Get('archive')
  public async getIsArchive(
    @Req() req: MyRequest,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('sort') sort: TSort,
  ) {
    return await this.vacancyService.getAllVacancy(
      req.user.id,
      true,
      page,
      limit,
      sort,
      name,
    );
  }

  // Update vacancy
  @ApiOperation({ summary: 'Update vacancy' })
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
  @ApiOkResponse({ type: VacancyDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: VacancyDto) {
    return this.vacancyService.update(id, body);
  }

  // Delete vacancy
  @ApiOperation({ summary: 'Delete vacancy' })
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
  @ApiOkResponse({ type: DeleteVacancyResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthTokenTypeGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.vacancyService.delete(id);
    return { message: 'Vacancy deleted' };
  }
}
