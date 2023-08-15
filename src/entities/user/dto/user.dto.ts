import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ResumeDto {
  @ApiProperty({ example: 'My resume', description: 'Resume' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://drive.google.com/drive/my-drive/resume',
    description: 'User resume url',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(regex.linkRegex, {
    message: 'No valid link',
  })
  link: string;
}

export class ProjectsDto {
  @ApiProperty({ example: 'My project', description: 'Project' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'GitHub link to project',
    required: true,
  })
  gitLink: string;

  @ApiProperty({
    example: 'https://my-project.onrender.com',
    description: 'Deploy link to project',
    required: true,
  })
  deployLink: string;

  @ApiProperty({
    example: 'Service for search animals',
    description: 'Description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CoverLetterDto {
  @ApiProperty({ example: 'My cover latter', description: 'Cover latter' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Text for cover latter',
    description: 'Text cover latter',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'User  email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(regex.linkRegex, {
    message: 'No valid link',
  })
  gitLink: string;

  @ApiProperty({ type: ResumeDto, isArray: true })
  resume: ResumeDto[];

  @ApiProperty({ type: ProjectsDto, isArray: true })
  projects: ProjectsDto[];

  @ApiProperty({ type: CoverLetterDto, isArray: true })
  coverLetter: CoverLetterDto[];
}
export class UserResponseDto {
  @ApiProperty({
    example: '164922b1-594a-4da0-b702-25bede1584ed',
    description: 'User id',
  })
  id: string;

  @ApiProperty({ example: 'user@mail.com', description: 'User  email' })
  email: string;

  @ApiProperty({ example: 'URL', description: 'User avatar' })
  avatarURL: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  username: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  gitLink: string;

  @ApiProperty({
    example: [
      {
        name: 'My resume',
        link: 'https://drive.google.com/drive/my-drive/resume',
      },
    ],
    description: 'Resume',
  })
  resume: string[];

  @ApiProperty({
    example: [
      {
        name: 'My project',
        gitLink: 'Link to GitHub',
        deployLink: 'Link to deploy',
        description: 'Description',
      },
    ],
    description: 'Projects',
  })
  projects: string[];

  @ApiProperty({
    example: [{ name: 'name', text: 'Text' }],
    description: 'Cover letter',
  })
  coverLetter: string[];

  @ApiProperty({ example: false, description: 'Is verified user' })
  verified: boolean;
}
