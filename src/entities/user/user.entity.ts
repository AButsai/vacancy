import { VacancyEntity } from '@entities/vacancy/vacancy.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import * as regex from '@utils/regex-expressions';
import { Matches, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity('users')
export class UserEntity extends MyBaseEntity {
  @ApiProperty({ example: 'user@mail.com', description: 'User  email' })
  @Column({ name: 'email', type: 'varchar' })
  @Unique(['email'])
  public email: string;

  @ApiProperty({ example: 'User password', description: 'User  password' })
  @Column({ name: 'password', type: 'varchar', nullable: true })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  public password: string;

  @ApiProperty({ example: 'URL', description: 'User avatar' })
  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  public avatarURL: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @Column({ name: 'username', type: 'varchar', nullable: true })
  public username: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  @Column({ name: 'git_link', type: 'varchar', nullable: true })
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public gitLink: string;

  @ApiProperty({
    example: [
      {
        name: 'My resume',
        link: 'https://drive.google.com/drive/my-drive/resume',
      },
    ],
    description: 'Resume',
  })
  @Column({ name: 'resume', type: 'jsonb', nullable: true })
  public resume: string;

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
  @Column({ name: 'projects', type: 'jsonb', nullable: true })
  public projects: string;

  @ApiProperty({
    example: [{ name: 'name', text: 'Text' }],
    description: 'Cover letter',
  })
  @Column({ name: 'cover_letter', type: 'jsonb', nullable: true })
  public coverLetter: string;

  @ApiProperty({ example: 'Refresh token', description: ' Refresh  token' })
  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  public refreshToken: string;

  @ApiProperty({ example: false, description: 'Is verified user' })
  @Column({ name: 'verified', type: 'boolean', default: false })
  public verified: boolean;

  @ApiProperty({ example: 'Verify token', description: 'Verify token' })
  @Column({ name: 'verify_token', type: 'varchar', default: null })
  public verifyToken: string;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.user, {
    onDelete: 'CASCADE',
  })
  public vacancy: VacancyEntity[];
}
