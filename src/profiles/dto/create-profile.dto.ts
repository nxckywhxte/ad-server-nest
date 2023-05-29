import { Gender } from '../../enums/gender.enum';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Обязательное поле' })
  lastName: string;
  @IsNotEmpty({ message: 'Обязательное поле' })
  firstName: string;
  @IsOptional()
  patronymic: string;
  @IsNotEmpty({ message: 'Обязательное поле' })
  avatar: string;
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsEnum(Gender, {
    message: 'Неверный формат пола! Возможные варианты: мужской и женский.',
  })
  gender: Gender;
  @IsOptional()
  @IsDate()
  birthday: Date;
  @IsOptional()
  @IsPhoneNumber('RU', {
    message: 'Неверный формат телефона! Допустимые: РФ',
  })
  phoneNumber: string;
}
