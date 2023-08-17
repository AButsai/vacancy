import { UserEntity } from '@entities/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@utils/base.entity';
import * as regex from '@utils/regex-expressions';
import { Matches } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IStatus } from './types/vacancy.interfaces';

@Entity('vacancy')
export class VacancyEntity extends MyBaseEntity {
  @ApiProperty({ example: 'SoftRyzen', description: 'Company name' })
  @Column({ name: 'company_name', type: 'varchar', nullable: true })
  public companyName: string;

  @ApiProperty({ example: 'FrontEnd', description: 'Position' })
  @Column({ name: 'position_vacancy', type: 'varchar', nullable: true })
  public position: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/company/softryzen/mycompany/',
    description: 'Company link',
  })
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  @Column({ name: 'company_link', type: 'varchar', nullable: true })
  public companyLink: string;

  @ApiProperty({ example: 'New', description: 'Main status' })
  @Column({ name: 'main_status', type: 'varchar', nullable: true })
  public mainStatus: string;

  @ApiProperty({
    example: [
      {
        name: 'New',
        date: '01-01-2023',
        reasons: 'Default null',
        isActive: true,
      },
    ],
    description: 'Status',
  })
  @Column({ name: 'status', type: 'jsonb', nullable: true })
  public status: IStatus[];

  @ApiProperty({ example: false, description: 'Is archive vacancy' })
  @Column({ name: 'is_archive', type: 'boolean', default: false })
  public isArchive: boolean;

  @ApiProperty({ example: '', description: 'Owner id' })
  @Column({ name: 'owner_id', type: 'varchar', nullable: true })
  public ownerId: string;

  @ManyToOne(() => UserEntity, (user) => user.vacancy)
  public user: UserEntity;
}
