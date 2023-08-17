import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';

export class StatusDto {
  @ApiProperty({ example: 'New', description: 'Current status' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '01-01-2023', description: 'Date' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'Default null', description: 'Rejection reason' })
  @IsString()
  reasons?: string;

  @ApiProperty({ example: true, description: 'Is active' })
  @IsBoolean()
  isActive: boolean;
}

export class VacancyDto {
  @ApiProperty({ example: 'SoftRyzen', description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/company/softryzen/mycompany/',
    description: 'Company link',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  companyLink: string;

  @ApiProperty({ example: 'New', description: 'Main status' })
  @IsString()
  @IsNotEmpty()
  mainStatus: string;

  @ApiProperty({ type: StatusDto, isArray: true })
  status: StatusDto[];

  @ApiProperty({ example: false, description: 'Is archive vacancy' })
  @IsBoolean()
  isArchive?: boolean;
}

export class DeleteVacancyResponseDto {
  @ApiProperty({
    example: 'Vacancy deleted',
    description: 'Delete vacancy',
  })
  message: string;
}

export class VacancyArchiveDto extends VacancyDto {
  @ApiProperty({ example: true, description: 'Is archive vacancy' })
  @IsBoolean()
  isArchive?: boolean;
}

export class VacancyResponseDto {
  @ApiProperty({ type: VacancyDto, isArray: true })
  items: VacancyDto[];

  @ApiProperty({
    example: 1,
    description: 'Total vacancies',
  })
  total: number;
}

export class VacancyArchiveResponseDto extends VacancyResponseDto {
  @ApiProperty({ type: VacancyArchiveDto, isArray: true })
  items: VacancyArchiveDto[];
}
