import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: string) {
    const existProfile = await this.profileRepository.findOne({
      where: { id },
    });
    if (existProfile === null) {
      throw new NotFoundException(
        'Профиль с такими данными не найден! Проверьте данные и попробуйте еще раз.',
      );
    }
    return existProfile;
  }

  async remove(id: string) {
    return await this.profileRepository.delete({ id });
  }
}
