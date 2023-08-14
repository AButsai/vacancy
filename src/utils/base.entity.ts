import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class MyBaseEntity extends BaseEntity {
  @ApiProperty({
    example: '1kvgfckkkkghlllljhfhjkkjhv',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Update date',
  })
  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @ApiProperty({
    example: '2023-05-27T13:27:44.787Z',
    description: 'Update date',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
