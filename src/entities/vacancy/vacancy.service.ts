import { UserEntity } from '@entities/user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { VacancyDto } from './dto/vacancy.dto';
import { TSort } from './types/vacancy.types';
import { VacancyEntity } from './vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepository: Repository<VacancyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Create vacancy
  public async create(userId: string, body: VacancyDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const newVacancy = this.vacancyRepository.create({
      ...body,
      ownerId: userId,
      user,
    });
    await this.vacancyRepository.save(newVacancy);
    delete newVacancy.user;
    return newVacancy;
  }

  // Update vacancy
  public async update(vacancyId: string, body: VacancyDto) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { id: vacancyId },
    });
    Object.assign(vacancy, body);
    await this.vacancyRepository.save(vacancy);
    return vacancy;
  }

  // Delete vacancy
  public async delete(vacancyId: string) {
    await this.vacancyRepository.delete(vacancyId);
  }

  // Get all vacancy
  public async getAllVacancy(
    userId: string,
    isArchive = false,
    page: number,
    limit: number,
    sort: TSort = 'asc',
    name?: string,
  ) {
    if (page < 1) {
      throw new BadRequestException(
        'Page must be greater than 0. Example page=1',
      );
    }
    if (!['asc', 'desc'].includes(sort)) {
      throw new BadRequestException(
        'Invalid sort value. Allowed values are "asc" and "desc".',
      );
    }
    const [items, total] = await this.vacancyRepository.findAndCount({
      where: {
        ownerId: userId,
        isArchive: isArchive,
        companyName: name ? ILike(`%${name}%`) : null,
      },
      order: { createAt: sort },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      items,
      total,
    };
  }
}
