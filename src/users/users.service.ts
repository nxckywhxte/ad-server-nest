import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { RolesService } from '../roles/roles.service';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly groupsService: GroupsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existRole = await this.rolesService.findOneByRoleName(
      createUserDto.roleName
    );
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
        username: createUserDto.username,
      },
    });
    if (existUser !== null) {
      throw new ConflictException(
        'Пользователь с такими данными уже существует! Проверьте данные и попробуйте еще раз.'
      );
    }
    const newUser = await this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      hashedPassword: await hash(createUserDto.rawPassword),
      role: {
        id: existRole.id,
        name: existRole.name,
      },
    });
    await this.userRepository.save(newUser);
    return this.returnUserWithoutPassword(newUser);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: true,
        groups: true,
      },
    });
  }

  async findOneByUsername(username: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (existUser === null) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз'
      );
    }
    return this.returnUserWithoutPassword(existUser);
  }

  async findOneByUsernameWithCredentials(username: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (existUser === null) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз'
      );
    }
    return existUser;
  }

  async findOneById(id: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (existUser === null) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз'
      );
    }
    return this.returnUserWithoutPassword(existUser);
  }

  async remove(id: string) {
    return await this.userRepository.delete({
      id,
    });
  }

  returnUserWithoutPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...newUserWithoutPassword } = user;
    return newUserWithoutPassword;
  }
}
